import collections
from pymodbus.client import ModbusSerialClient as ModbusClient
from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadDecoder
import time
import socketio
from multiprocessing import Array
from GZ900 import GZ900

Controller = GZ900(1)
PARAM=Array('i', [0,0,0,0,0,0,0,0,0,0])

d = collections.deque(maxlen=10)

def CALCOLA_INT32(val):         
   my_bytes1 = bytes([0x00, 0x00])
   my_bytes2 = bytes([0x00, 0x00])
   my_bytes1  = val[0].to_bytes(2, 'big')
   my_bytes2  = val[1].to_bytes(2, 'big')          
   return int.from_bytes(my_bytes1+my_bytes2, byteorder='big', signed=True)

def TASK_MODBUS(T_CONT,PARAM):
    
   print("TASK MODBUS-RTU")

   sio = socketio.Client()
   sio.connect('http://localhost:5000')

   @sio.event
   def connect():
      print("I'm connected!")

   @sio.event
   def connect_error(data):
      print("The connection failed!")

   @sio.event
   def disconnect():
     print("I'm disconnected!")
      
   client = ModbusClient(method='rtu', port="COM3", baudrate=115200, stopbits = 1, parity='N', timeout=0.3)
   connection = client.connect()     
   last_median = 0.0
   
   while True:
      #if is_connected == False:
      #   time.sleep(1)
      #   sio.connect('http://localhost:3000', transports=['websocket'])
      #   continue       
      for k,add in enumerate(T_CONT.ADDRESSES):     
         #print("GZ900 n°",(k+1))
         for key in T_CONT.READ_REGS:                    
            try:
               read_vals = client.read_holding_registers(T_CONT.READ_REGS[key][0], 2, add) # start_address, count, slave_id   
               gg = read_vals.registers                    
               decoder = BinaryPayloadDecoder.fromRegisters(gg, byteorder=Endian.BIG, wordorder=Endian.BIG)                                      
               res = CALCOLA_INT32(gg)
               T_CONT.READ_REGS[key][k+1] = res               
               #print("R  :",key,"->",res)               
            except:    
               print("Error during read register : ",k)
            
         #print("temp = " + str(T_CONT.READ_REGS["Input 1_Measured value (PV)"][1]))
         d.append(T_CONT.READ_REGS["Input 1_Measured value (PV)"][1])
         median = sum(d) / len(d)
         #print("Median = " + str(median))
         if median != last_median:  
            last_median = median
            print("d.size = " + str(len(d)))
            print(">>>Median = " + str(median))
            sio.emit('temperature', {'x': int(time.time() * 1000), 't': median})


         for key in T_CONT.WRITE_REGS:          
            try:
               read_vals  = client.read_holding_registers(T_CONT.WRITE_REGS[key][0], 2, add) # start_address, count, slave_id      
               gg = read_vals.registers                                     
               decoder = BinaryPayloadDecoder.fromRegisters(gg, byteorder=Endian.BIG, wordorder=Endian.BIG)                                          
               res = CALCOLA_INT32(gg)
               T_CONT.WRITE_REGS[key][k+1] = res               
               #print("R/W:",key,"->",res)
            except:
               print("Error during write register : ",k)      

         #print("--------------------------------------------------------------------------------")             
          
      #client.close()      
       
      #time.sleep(1)

if __name__ == '__main__':
   TASK_MODBUS(Controller,PARAM)    

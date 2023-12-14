

class GZ900:

    addr = 0
    ADDRESSES = [ 1 ]

    READ_REGS  = {
        "Comprehensive event state" : [ 0x2C, -1, 0, 0, 0 ],
        "Input 1_Measured value (PV)" : [ 0x00, -1, 0, 0, 0 ],
        "Input 1_Set value (SV) monitor": [ 0x02, -1, 0, 0, 0 ],
        "DO state monitor" : [ 0x56, -1, 0, 0, 0 ],
        "Memory area transfer" : [ 0x64, -1, 0, 0, 0 ]
    } 
   
    
    WRITE_REGS = {    #add, val
        "RUN-STOP" : [ 0x6C, 0, 0, 0, 0 ],
        "Input1 set value":   [ 0x500, -1, 0, 0, 0 ],
        "Area1 soak time" :   [ 0x550, -1, 0, 0, 0 ],
        "Input2 set value":   [ 0x592, -1, 0, 0, 0 ],
        "Area2 soak time":    [ 0x5E2, -1, 0, 0, 0 ]
    }
   
    
    def __init__(self,address):
        self.addr= 1
    
class THVA1:

    NO_OUTPUT = 0
    POWER_FREQUENCY_ERROR = 1
    BOARD_ERROR = 2
    POWER_SUPPLY_VOLTAGE_ERROR = 4
    HEATER_BREAK_ALARM_1 = 8
    HEATER_BREAK_ALARM_2 = 16
    THYRISTOR_BREAK_DOWN_ALARM = 32
    OVER_CURRENT = 64
    FUSE_BREAK = 128
    HEAT_SINK_TEMPERATORE_ABNORNALITY = 256
    
    
    ADDRESSES = [ 2 ]
    #ADDRESSES = [ 2, 4, 6, 8]

    READ_REGS  = {
        # Allarme
        "Alarm code" : [ 0x3D, -1, -1, -1, -1 ],
        # legge la tensione
        "Voltage value monitor" : [ 0x03, -1, 0, 0, 0 ],
        # legge la corrente
        "Power value monitor": [ 0x04, -1, 0, 0, 0 ],
        # legge la corrente
        "CT input monitor" : [ 0x02, -1, 0, 0, 0 ],
        # Display the open/close state of contact input
        "Contact input state monitor" : [ 0x0A, -1, 0, 0, 0 ]
    } 
    
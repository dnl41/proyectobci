

function receiver(sck, data)
  print(data)
  if data == "blink" then
    if status == gpio.HIGH then
        status = gpio.LOW
        pwm.setduty(pin, 27);  --27
    else
        status = gpio.HIGH
        pwm.setduty(pin, 123); --123
    end

    gpio.write(led, status)
  end 
  sck:close()
end

function startup()
   --gpio.write(pin, gpio.LOW)
   sv=net.createServer(net.TCP, 0)
   if sv then
    sv:listen(3000, function(conn)
    conn:on("receive", receiver)
    -- conn:send("hello world")
   end)
   end
end

print("Ready to start soft ap")
local str=wifi.ap.getmac();

pin = 4
led = 0
pwm.setup(pin, 50, 27)
pwm.start(pin); 

cfg={}
cfg.ssid="Daniel";
cfg.pwd="12345678";
wifi.ap.config(cfg)
     
cfg={}
cfg.ip="192.168.1.1";
cfg.netmask="255.255.255.0";
cfg.gateway="192.168.1.1";
wifi.ap.setip(cfg);
wifi.setmode(wifi.SOFTAP)

local status = gpio.HIGH
 
--gpio.mode(pin, gpio.OUTPUT)
gpio.mode(led, gpio.OUTPUT)
   
gpio.write(pin, status)
gpio.write(led, gpio.HIGH)
collectgarbage();
print("Soft AP started")
print("Heep:(bytes)"..node.heap());
print("MAC:"..wifi.ap.getmac().."\r\nIP:"..wifi.ap.getip());
startup()


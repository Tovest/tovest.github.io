x = logspace(-10,10,20);
yradice = radice(x);
ysqrt = sqrt(x);

subplot(2,1,1);
semilogx(x,yradice.*yradice-x,"-*r");
grid on;
title("Err. commesso da radice (scala logaritmica)")

subplot(2,1,2);
semilogx(x,ysqrt.*ysqrt-x,"-ob");
grid on;
title("Err. commesso da sqrt (scala logaritmica)")




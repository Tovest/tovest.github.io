f = @(x) sin(x)-sin(x/2);
f1 = @(x) cos(x)-cos(x/2)/2;
lsx = 0;
ldx = 30;
num_x_interp = 16;

x_interp = xchebyshev(num_x_interp-1,lsx,ldx);
y_interp = f(x_interp);
y1_interp = f1(x_interp);
xq = lsx:(ldx-lsx)/(200):ldx;
x_display = lsx:(ldx-lsx)/(10000):ldx;
y_display = f(x_display);

subplot(5,1,1);
yq = lagrange(x_interp,y_interp,xq);
plot(x_interp,y_interp,'ob',xq,yq,'g',                                x_display,y_display,'--r');
title("Lagrange");

subplot(5,1,2);
yq = newton(x_interp,y_interp,xq);
plot(x_interp,y_interp,'ob',xq,yq,'g',                                x_display,y_display,'--r');
title("Newton");

subplot(5,1,3);
yq = hermite(x_interp,y_interp,y1_interp,xq);
plot(x_interp,y_interp,'ob',xq,yq,'g',                                x_display,y_display,'--r');
title("Hermite");

subplot(5,1,4);
yq = spline0(x_interp,y_interp,xq);
plot(x_interp,y_interp,'ob',xq,yq,'g',                                x_display,y_display,'--r');
title("Spline Naturale");

subplot(5,1,5);
yq = spline(x_interp,y_interp,xq);
plot(x_interp,y_interp,'ob',xq,yq,'g',                                x_display,y_display,'--r');
title("Spline Not-A-Knot");
f = @(x) 1./( 2*( 2*x.*x - 2*x +1 ) );
f1 = @(x) -((8*x-4)./((4*x.*x-4*x+2).*(4*x.*x-4*x+2)));
lsx = -2;
ldx = 3;
num_x_interp = 17;

x_equi_interp = linspace(lsx,ldx,num_x_interp);
y_equi_interp = f(x_equi_interp);
y1_equi_interp = f1(x_equi_interp);
x_cheb_interp = xchebyshev(num_x_interp-1,lsx,ldx);
y_cheb_interp = f(x_cheb_interp);
y1_cheb_interp = f1(x_cheb_interp);
xq = lsx:(ldx-lsx)/(200):ldx;
x_display = lsx:(ldx-lsx)/(10000):ldx;
y_display = f(x_display);



subplot(5,2,1);
yq = lagrange(x_equi_interp,y_equi_interp,xq);
plot(x_equi_interp,y_equi_interp,'ob',xq,yq,'g',                                x_display,y_display,'--r');
title("Lagrange ("+string(num_x_interp)+" x equidistanti)");
legend("Punti da interpolare","Polinomio interpolante","Funzione da interpolare")

subplot(5,2,3);
yq = newton(x_equi_interp,y_equi_interp,xq);
plot(x_equi_interp,y_equi_interp,'ob',xq,yq,'g',                                x_display,y_display,'--r');
title("Newton ("+string(num_x_interp)+" x equidistanti)");

subplot(5,2,5);
yq = hermite(x_equi_interp,y_equi_interp,y1_equi_interp,xq);
plot(x_equi_interp,y_equi_interp,'ob',xq,yq,'g',                                x_display,y_display,'--r');
title("Hermite ("+string(num_x_interp)+" x equidistanti)");

subplot(5,2,7);
yq = spline0(x_equi_interp,y_equi_interp,xq);
plot(x_equi_interp,y_equi_interp,'ob',xq,yq,'g',                                x_display,y_display,'--r');
title("Spline Naturale ("+string(num_x_interp)+" x equidistanti)");

subplot(5,2,9);
yq = spline(x_equi_interp,y_equi_interp,xq);
plot(x_equi_interp,y_equi_interp,'ob',xq,yq,'g',                                x_display,y_display,'--r');
title("Spline Not-A-Knot ("+string(num_x_interp)+" x equidistanti)");



subplot(5,2,2);
yq = lagrange(x_cheb_interp,y_cheb_interp,xq);
plot(x_cheb_interp,y_cheb_interp,'ob',xq,yq,'g',                                x_display,y_display,'--r');
title("Lagrange ("+string(num_x_interp)+" x di Chebyshev)");

subplot(5,2,4);
yq = newton(x_cheb_interp,y_cheb_interp,xq);
plot(x_cheb_interp,y_cheb_interp,'ob',xq,yq,'g',                                x_display,y_display,'--r');
title("Newton ("+string(num_x_interp)+" x di Chebyshev)");

subplot(5,2,6);
yq = hermite(x_cheb_interp,y_cheb_interp,y1_cheb_interp,xq);
plot(x_cheb_interp,y_cheb_interp,'ob',xq,yq,'g',                                x_display,y_display,'--r');
title("Hermite ("+string(num_x_interp)+" x di Chebyshev)");

subplot(5,2,8);
yq = spline0(x_cheb_interp,y_cheb_interp,xq);
plot(x_cheb_interp,y_cheb_interp,'ob',xq,yq,'g',                                x_display,y_display,'--r');
title("Spline Naturale ("+string(num_x_interp)+" x di Chebyshev)");

subplot(5,2,10);
yq = spline(x_cheb_interp,y_cheb_interp,xq);
plot(x_cheb_interp,y_cheb_interp,'ob',xq,yq,'g',                                x_display,y_display,'--r');
title("Spline Not-A-Knot ("+string(num_x_interp)+" x di Chebyshev)");
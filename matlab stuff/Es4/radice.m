function x = radice(x)
%
% r = radice(x)
%
% Calcola la radice quadrata di un numero non negativo.
%
% Input:
%       x: Numero non negativo di cui si vuole sapere la radice quadrata.
% Output
%       r: Radice quadrata del numero dato in input.
%
    sz = size(x);
    sz = sz(1)*sz(2);
    for i=1:sz
        if x(i)<0; error("Numero negativo non ammesso."); end
        if x(i)==0; continue; end
        x0 = x(i);
        oldfx = -1;
        fx = x(i)*x(i)-x0;
        x(i) = x(i) -fx/(x(i)+x(i));
        while 1
            fx = x(i)*x(i)-x0;
            x(i) = x(i) -fx/(x(i)+x(i));
            if fx<=0 || fx==oldfx; break; end
            oldfx = fx;
        end
    end
end
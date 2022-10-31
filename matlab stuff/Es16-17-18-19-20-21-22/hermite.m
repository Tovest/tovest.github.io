function yq = hermite(x,y,y1,xq)
%
% yq = hermite(x,y,y1,xq)
%
% Calcola il polinomio interpolante in forma di Newton.
%
% Input:
%       x: Ascisse di interpolazione.
%       y: Ordinate corrispondenti alle ascisse di intrpolazione.
%       y1: Derivate nei punti (x,y).
%       xq: Ascisse di cui si vuole sapere il valore corrispondente sul
%       polinomio interpolante.
% Output
%       yq: Valori sul polinomio interpolante corrispondenti alle ascisse
%       in "xq".
%
    x = x(:);
    lenx = length(x);
    if lenx<1; error("Ci deve essere almeno una terna ascissa-ordinata-derivata."); end
    for i=1:lenx
        for j=i+1:lenx
            if x(i)==x(j); error("Le ascisse devono essere distinte."); end
        end
    end
    y = y(:);
    if lenx~=length(y)
        error( ...
            "Il numero di ascisse ("+string(lenx)+ ...
            ") non corrisponde al numero di ordinate ("+string(length(y))+")." ...
            );
    end
    y1 = y1(:);
    if length(y)~=length(y1)
        error( ...
            "Il numero di derivate ("+string(lenx)+ ...
            ") non corrisponde al numero di ordinate ("+string(length(y))+")." ...
            );
    end

    nx = ones(2*lenx,1);
    dd = ones(2*lenx,1);
    for i=1:lenx
        nx(2*i-1) = x(i);
        nx(2*i) = x(i);
        dd(2*i-1) = y(i);
        dd(2*i) = y1(i);
    end
    for i=(2*lenx-1):-2:3
        dd(i) = (dd(i)-dd(i-2))/(nx(i)-nx(i-1));
    end
    for j=2:(2*lenx-1)
        for i=(2*lenx):-1:j+1
            dd(i) = (dd(i)-dd(i-1))/(nx(i)-nx(i-j));
        end
    end

    yq = dd(2*lenx);
    for i=2*lenx-1:-1:1
        yq = yq.*(xq-nx(i))+dd(i);
    end

    return;
end


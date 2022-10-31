function yq = newton(x,y,xq)
%
% yq = newton(x,y,xq)
%
% Calcola il polinomio interpolante in forma di Newton.
%
% Input:
%       x: Ascisse di interpolazione.
%       y: Ordinate corrispondenti alle ascisse di intrpolazione.
%       xq: Ascisse di cui si vuole sapere il valore corrispondente sul
%       polinomio interpolante.
% Output
%       yq: Valori sul polinomio interpolante corrispondenti alle ascisse
%       in "xq".
%
    x = x(:);
    lenx = length(x);
    if lenx<1; error("Ci deve essere almeno una coppia ascissa-ordinata."); end
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

    for j=1:lenx-1
        for i=lenx:-1:j+1
            y(i) = (y(i)-y(i-1))/(x(i)-x(i-j));
        end
    end

    yq = y(lenx);
    for i=lenx-1:-1:1
        yq = yq.*(xq-x(i))+y(i);
    end
    
    return;
end


function yq = lagrange(x,y,xq)
%
% yq = lagrange(x,y,xq)
%
% Calcola il polinomio interpolante in forma di Lagrange.
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
    yq = xq;
    xq = xq(:);
    lenxq = length(xq);

    e = eye(lenx);
    t = x*ones(1,lenx);
    t = t'-t+e;
    pd = prod(t);
    o = ones(lenx)-e;
    for i=1:lenxq
        s = xq(i)-x;
        t = s.*o+e;
        pn = prod(t);
        yq(i) = (pn./pd)*y;
    end

    return;
end


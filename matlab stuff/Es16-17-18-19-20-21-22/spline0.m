function yq = spline0(x,y,xq)
%
% yq = spline0(x,y,xq)
%
% Calcola la spline naturale.
%
% Input:
%       x: Ascisse di interpolazione.
%       y: Ordinate corrispondenti alle ascisse di intrpolazione.
%       xq: Ascisse di cui si vuole sapere il valore corrispondente sulla
%       spline naturale.
% Output
%       yq: Valori sulla spline corrispondenti alle ascisse in "xq".
%
    x = x(:);
    lenx = length(x);
    if lenx<2; error("Ci devono essere almeno due coppie ascissa-ordinata."); end
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

    if lenx>2
        h = x(2:end) - x(1:end-1);
        % Genera le differenze divise (dd)
        dd = zeros(lenx-2,1);
        for i=1:lenx-2
            xmx = x(i+2)-x(i);
            dd(i) = y(i)/(h(i)*xmx) - y(i+1)/(h(i)*h(i+1)) + y(i+2)/(h(i+1)*xmx);
        end
        dd = 6*dd;
        % Genera la sovradiagonale "b" e la sottodiagonale "c" di
        % A = [a1 b1 0 ...; c1 a2 b2 0 ...; 0 c2 a3 b3 0 ...; ... ]
        b = ones(lenx-3,1);
        c = ones(lenx-3,1);
        for i = 1:lenx-3
           b(i) = h(i+1)/(h(i)+h(i+1));
           c(i) = h(i+1)/(h(i+2)+h(i+1));
        end
        % Calcola le derivate seconde (dd = A\dd)
        % L'algoritmo qui sotto risolve sistemi tridiagonali con diagonale
        % principale "a" formata da solo 2.
        a = ones(lenx-2,1);
        a(1) = 2;
        for i = 1:lenx-3
           b(i) = b(i)/a(i);
           a(i+1) = 2 -b(i)*c(i);
           dd(i+1) = dd(i+1) -b(i)*dd(i);
        end
        dd(lenx-2) = dd(lenx-2)/a(lenx-2);
        for i=(lenx-3):-1:1
           dd(i) = (dd(i)-c(i)*dd(i+1))/a(i);
        end
        
        % Calcola i valori "xq" sulla spline
        [xq,o] = sort(xq);
        j = 1;
        xmx = h(1);
        while j<=lenxq && xq(j)<=x(2)
            %%%
            yq(j) = ((xq(j)-x(1))^3)*dd(1);
            yq(j) = yq(j) / (6*xmx);
            yq(j) = yq(j) + (xq(j)-x(1))*(y(2)-(xmx*xmx*dd(1)/6)-y(1))/xmx;
            yq(j) = yq(j) + y(1);
            %%%
            j = j+1;
        end
        for i=2:lenx-2
            xmx = h(i);
            while j<=lenxq && xq(j)<=x(i+1)
                %%%
                yq(j) = ((xq(j)-x(i))^3)*dd(i);
                yq(j) = yq(j) + ((x(i+1)-xq(j))^3)*dd(i-1);
                yq(j) = yq(j) / (6*xmx);
                ri = y(i)-(xmx*xmx*dd(i-1)/6);
                yq(j) = yq(j) + (xq(j)-x(i))*(y(i+1)-(xmx*xmx*dd(i)/6)-ri)/xmx;
                yq(j) = yq(j) + ri;
                %%%
                j = j+1;
            end
        end
        xmx = h(lenx-1);
        while j<=lenxq
            %%%
            yq(j) = ((x(lenx)-xq(j))^3)*dd(lenx-2);
            yq(j) = yq(j) / (6*xmx);
            ri = y(lenx-1)-(xmx*xmx*dd(lenx-2)/6);
            yq(j) = yq(j) + (xq(j)-x(lenx-1))*(y(lenx)-ri)/xmx;
            yq(j) = yq(j) + ri;
            %%%
            j = j+1;
        end
        yq = yq(o);
    
    % Gestisci il caso in cui si hanno solo due coppie (X,Y)
    else
        j = 1;
        xmx = x(2)-x(1);
        while j<=lenxq
            %%%
            yq(j) = (xq(j)-x(1))*(y(2)-y(1))/xmx + y(1);
            %%%
            j = j+1;
        end
    end

    return;
end
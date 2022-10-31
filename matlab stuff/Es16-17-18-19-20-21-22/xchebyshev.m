function x = xchebyshev(n,a,b)
%
% x = xchebyshev(n,a,b)
%
% Restituisce le n+1 ascisse di Chebyshev per un polinomio di grado "n"
% nell'intervallo (a,b).
%
% Input:
%       n: Grado del polinomio che deve interpolare le n+1 ascisse.
%       a: Limite sinistro dell'intervallo.
%       b: Limite destro dell'intervallo.
% Output
%       x: n+1 ascisse di Chebyshev nell'intervallo (a,b).
%
    if n<=0; error("n deve essere positivo."); end
    if a>b; error("b deve essere maggiore di a."); end
    x = zeros(n+1,1);
    bfrmidm1 = (n+1-(mod(n+1,2)))/2 -1;
    for i=0:bfrmidm1
        x(n-i+1) = cos((2*i+1)*pi/(2*(n+1)));
        x(i+1) = -x(n-i+1);
    end
    x = x*(b-a);
    x = x+(a+b);
    x = x/2;
end
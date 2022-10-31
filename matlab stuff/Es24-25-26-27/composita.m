function [If,err,nfeval] = composita(fun,a,b,n,tol)
%
% [If,err,nfeval] = composita(fun,a,b,n,tol)
%
% Restituisce una approssimazione di un integrale usando la formula di
% Newton-Cotes composita di grado "n".
%
% Input:
%       fun: Funzione integranda.
%       a: Estermo sinistro di integrazione.
%       b: Estremo destro di integrazione.
%       n: Grado dei polinomi interpolanti.
%       tol: Tolleranza ammessa per l'errore commesso dalla
%       approssimazione.
% Output
%       If: Approssimazione dell'integrale.
%       err: Approssimazione dell'errore commesso.
%       nfeval: Numero totale di valutazioni funzionali eseguite.
%
    if b<a; error("b deve essere maggiore di a."); end
    if tol<0; error("tol deve essere un numero positivo."); end
    ncp = ncpesi(n);
    h = b-a;
    den = 2^(n+mod(n+1,2)+1)-1;
    y = feval(fun, a+(0:1/n:1)*h ); nfeval = n+1;
    y = y(:)';
    If = sum(y*ncp)*h/n;
    ncp = ncp(2:end);
    err = tol+1;
    intrvls = 1;
    while err>tol
        intrvls = intrvls*2;
        ny = ones(n,intrvls);
        for j=1:n*intrvls/2
            ny(j*2-1) = feval(fun, a+h*(2*j-1)/(intrvls*n) ); nfeval = nfeval+1;
            ny(j*2) = y(j+1);
        end
        y = [y(1); ny(:)];
        ny = ny';
        ny(:,end) = ny(:,end)+[y(1); ny(1:end-1,end)];
        Ip = If;
        If = sum(ny*ncp)*h/(intrvls*n);
        err = abs( (If-Ip)/den );
    end
    return;
end
function [If,nfeval] = adapsimp(f,a,b,tol,f1,f3,f5)
%
% [If,nfeval] = adapsimp(f,a,b,tol)
%
% Restituisce una approssimazione di un integrale usando la formula di
% Simpson.
%
% Input:
%       f: Funzione integranda.
%       a: Estermo sinistro di integrazione.
%       b: Estremo destro di integrazione.
%       tol: Tolleranza ammessa per l'errore commesso dalla
%       approssimazione.
% Output
%       If: Approssimazione dell'integrale.
%       nfeval: Numero totale di valutazioni funzionali eseguite.
%
    nfeval = 2;
    if nargin<=4
        if b<a; error("b deve essere maggiore di a."); end
        if tol<0; error("tol deve essere un numero positivo."); end
        f1 = feval(f,a);
        f3 = feval(f,(a+b)/2);
        f5 = feval(f,b);
        nfeval = nfeval+3;
    end
    h = b-a;
    f2 = feval(f,(3*a+b)/4);
    f4 = feval(f,(a+3*b)/4);
    Ip = (h/6)*(f1+4*f3+f5);
    If = (h/12)*(f1+4*f2+2*f3+4*f4+f5);
    x3 = (a+b)/2;
    e = abs(If-Ip)/15;
    if e>tol
        [If_1,nfeval_1] = adapsimp(f, a, x3, tol/2, f1, f2, f3);
        [If_2,nfeval_2] = adapsimp(f, x3, b, tol/2, f3, f4, f5);
        If = If_1+If_2;
        nfeval = nfeval+nfeval_1+nfeval_2;
    end
    return;
end


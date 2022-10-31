function [If,nfeval] = adaptrap(f,a,b,tol,fa,fb)
%
% [If,nfeval] = adaptrap(f,a,b,tol)
%
% Restituisce una approssimazione di un integrale usando la formula dei
% trapezi.
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
    nfeval = 1;
    if nargin<=4
        if b<a; error("b deve essere maggiore di a."); end
        if tol<0; error("tol deve essere un numero positivo."); end
        fa = feval(f,a);
        fb = feval(f,b);
        nfeval = nfeval+2;
    end
    h = b-a;
    xmid = (a+b)/2;
    fmid = feval(f,xmid);
    Ip = (h/2)*(fa+fb);
    If = (Ip+h*fmid)/2;
    e = abs(If-Ip)/3;
    if e>tol
        [If_1,nfeval_1] = adaptrap(f, a, xmid, tol/2, fa, fmid);
        [If_2,nfeval_2] = adaptrap(f, xmid, b, tol/2, fmid, fb);
        If = If_1+If_2;
        nfeval = nfeval+nfeval_1+nfeval_2;
    end
    return;
end


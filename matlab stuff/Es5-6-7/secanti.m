function [x,niter,nfeval] = secanti(f,f1,x0,tol,maxiter)
%
% [x,niter,nfeval] = secanti(f,f1,x0,tol,maxiter)
%
% Ricerca una radice di una funzione usando il metodo delle secanti.
%
% Input:
%       f: Funzione di cui si vuole trovare una radice.
%       f1: Derivata della funzione "f".
%       x0: Approssimazione iniziale della radice.
%       tol: Tolleranza sotto la quale accettiamo l'approssimazione.
%       maxiter: Numero massimo di iterazioni permesse.
% Output
%       x: Approssimazione della radice.
%       niter: Numero di iterazioni svolte per trovare "x".
%       nfeval: Numero di valutazioni funzionali eseguite per trovare "x".
%
    if tol<0; error("tol deve essere un numero positivo."); end
    nfeval = 2;
    niter = 1;
    fx = feval(f,x0);
    f1x = feval(f1,x0);
    x = x0 - fx/f1x;
    for i=1:maxiter
        niter = niter + 1;
        if abs(x-x0)<=tol*(1+abs(x0)); return; end
        fx0 = fx;
        fx = feval(f,x); nfeval = nfeval+1;
        if (fx-fx0)==0
            if fx<=tol; return; end
            error("Il metodo non converge.");
        end
        xtemp = (fx*x0-fx0*x)/(fx-fx0);
        x0 = x;
        x = xtemp;
    end
    if abs(x-x0)>tol*(1+abs(x0)); error("Il metodo non converge."); end
    return;
end
function [x,niter,nfeval] = steffensen(f,x0,tol,maxiter)
%
% [x,niter,nfeval] = steffensen(f,x0,tol,maxiter)
%
% Ricerca una radice di una funzione usando il metodo di Steffensen.
%
% Input:
%       f: Funzione di cui si vuole trovare una radice.
%       x0: Approssimazione iniziale della radice.
%       tol: Tolleranza sotto la quale accettiamo l'approssimazione.
%       maxiter: Numero massimo di iterazioni permesse.
% Output
%       x: Approssimazione della radice.
%       niter: Numero di iterazioni svolte per trovare "x".
%       nfeval: Numero di valutazioni funzionali eseguite per trovare "x".
%
    if tol<0; error("tol deve essere un numero positivo."); end
    nfeval = 0;
    niter = 0;
    x = x0;
    for i=1:maxiter
        niter = niter + 1;
        x0 = x;
        fx = feval(f,x0); nfeval = nfeval+1;
        den = feval(f,x0+fx)-fx; nfeval = nfeval+1;
        if den==0
            if fx<=tol; return; end
            error("Il metodo non converge.");
        end
        x = x0-(fx*fx)/den;
        if abs(x-x0)<=tol*(1+abs(x0)); break; end
    end
    if abs(x-x0)>tol*(1+abs(x0)); error("Il metodo non converge."); end
    return;
end
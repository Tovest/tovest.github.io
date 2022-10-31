function [x0,nit] = newton(fun,jacobian,x0,tol,maxit)
%
% [x,nit] = newton(fun,jacobian,x0,tol,maxit)
%
% Ricerca una soluzione per il sistema nonlineare "fun(x1,x2...) = vettore
% nullo" usando il metodo di Newton.
%
% Input:
%       fun: Sistema di funzioni di cui si vuole trovare una soluzione che
%       restituisce il vettore nullo.
%       jacobian: Matrice jacobiana del sistema "fun".
%       x0: Approssimazione iniziale della soluzione.
%       tol: Tolleranza con la quale accettiamo la approssimazione della
%       soluzione.
%       maxit: Numero massimo di iterazioni permesse.
% Output
%       x: Approssimazione della soluzione.
%       nit: Numero di iterazioni impiegate per calcolare l'approssimazione
%       "x".
%
    if tol<0; error("tol deve essere un numero positivo."); end
    x0 = x0(:);
    nit = 0;
    if nargin<4; tol = 1e-10; end
    if nargin<5; maxit = log2(1/tol); end
    for i=1:maxit
        nit = nit+1;
        fx = feval(fun,x0);
        jx = feval(jacobian,x0);
        d = jx\(-fx);
        x0 = x0+d;
        if norm(d)<=tol*(1+norm(x0)); break; end
    end
end


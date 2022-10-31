function [x,nr] = miaqr(A,b)
%
% [x,nr] = miaqr(A,b)
%
% Risolve il sistema lineare Ax=b ai minimi quadrati usando la
% fattorizzazione QR.
%
% Input:
%       A: Matrice non sottodeterminata con rango massimo.
%       b: Colonna dei termini noti.
% Output
%       x: Soluzione del sistema Ax=b ai minimi quadrati.
%
    [m,n] = size(A);
    if m<n; error("Il sistema non deve essere sottodeterminato"); end
    [mb,~] = size(b);
    if mb~=m; error("Il numero di righe di b non corrisponde al numero di righe di A."); end
    QT = eye(m);
    for i=1:n
        alpha = norm(A(i:m,i));
        if alpha==0; error("La matrice A non ha rango massimo"); end
        if A(i,i)>0; alpha = -alpha; end
        v = [A(i,i)-alpha; A(i+1:m,i)];
        H = 2/(v'*v)*(v*v');
        QT(i:m,:) = QT(i:m,:)-H*QT(i:m,:);
        A(i:m,i+1:n) = A(i:m,i+1:n)-H*A(i:m,i+1:n);
        A(i,i) = alpha;
    end

    b = QT*b;
    x = b(1:n,:);
    nr = vecnorm(b(n+1:end,:));

    for i=n:-1:1
        x(i,:) = x(i,:)/A(i,i);
        x(1:i-1,:) = x(1:i-1,:)-(x(i,:).*A(1:i-1,i));
    end

    return;
end
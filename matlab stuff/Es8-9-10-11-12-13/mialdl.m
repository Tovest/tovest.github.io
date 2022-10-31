function b = mialdl(A,b)
%
% x = mialdl(A,b)
%
% Risolve il sistema lineare Ax=b usando la fattorizzazione LDL'.
%
% Input:
%       A: Matrice quadrata, simmetrica e definita positiva.
%       b: Colonna dei termini noti.
% Output
%       x: Soluzione del sistema Ax=b.
%
    [m,n] = size(A);
    if m~=n; error("A non è una matrice quadrata"); end
    [mb,~] = size(b);
    if mb~=n; error("Il numero di righe di b non corrisponde al numero di righe di A."); end
    if A(1,1)<=0; error("A non è sdp"); end
    A(2:m,1) = A(2:m,1)/A(1,1);
    for j=2:n
        v = A(j,1:j-1)'.*diag(A(1:j-1,1:j-1));
        A(j,j) = A(j,j) - A(j,1:j-1)*v;
        if A(j,j)<=0; error("A non è sdp"); end
        A(j+1:m,j) = (A(j+1:m,j) - A(j+1:m,1:j-1)*v)/A(j,j);
    end
    
    for i=2:n
        b(i:n,:) = b(i:n,:)-A(i:n,i-1)*b(i-1,:);
    end

    b = b./diag(A);

    for i=n:-1:2
        b(1:i-1,:) = b(1:i-1,:)-(b(i,:)'.*A(i,1:i-1))';
    end

    return;
end
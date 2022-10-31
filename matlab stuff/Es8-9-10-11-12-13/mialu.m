function b = mialu(A,b)
%
% x = mialu(A,b)
%
% Risolve il sistema lineare Ax=b usando la fattorizzazione LU con
% pivoting.
%
% Input:
%       A: Matrice quadrata e non singolare.
%       b: Colonna dei termini noti.
% Output
%       x: Soluzione del sistema Ax=b.
%
    [m,n] = size(A);
    if m~=n; error("A non è una matrice quadrata."); end
    [mb,~] = size(b);
    if mb~=n; error("Il numero di righe di b non corrisponde al numero di righe di A."); end
    for j=1:n-1
        [vmax, imax] = max(A(j:m, j));
        if vmax==0; error("A è singolare."); end
        imax = imax + j -1;
        if imax>j
            A([j imax],:) = A([imax j],:);
            b([j imax],:) = b([imax j],:);
        end
        A(j+1:m,j) = A(j+1:m,j)/A(j,j);
        A(j+1:m,j+1:n) = A(j+1:m,j+1:n) - A(j+1:m,j)*A(j,j+1:n);
    end

    for i=2:n
        b(i:n,:) = b(i:n,:)-A(i:n,i-1)*b(i-1,:);
    end

    for i=n:-1:1
        b(i,:) = b(i,:)/A(i,i);
        b(1:i-1,:) = b(1:i-1,:)-(b(i,:).*A(1:i-1,i));
    end

    return;
end
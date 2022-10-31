function w = ncpesi(n)
%
% w = ncpesi(n)
%
% Restituisce i pesi della quadratura della formula di Newton-Cotes di un
% certo grado.
%
% Input:
%       n: Grado della formula di Newton-Cotes.
% Output
%       w: Pesi della formula di Newton-Cotes di grado "n".
%
    if n<=0; error("n deve essere un numero positivo."); end
    w = ones(n+1,1);
    c = (n+1:-1:1);
    o = mod(n+1,2);
    bfrmid = (n+1-o)/2;
    for i=1:bfrmid+o-1
        t = [0:i-1, i+1:n];
        den = prod(i - t);
        a = poly(t);
        a = [a./c, 0];
        num = polyval(a, n);
        w(i+1) = num/den;
        w(n+1-i) = w(i+1);
    end
    w(1) = n/2 - o*w(bfrmid+o)/2 - sum(w(2:bfrmid));
    w(n+1) = w(1);
    return;
end
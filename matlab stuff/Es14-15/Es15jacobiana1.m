function x = Es15jacobiana1(x)
    if length(x)~=2; error("Questa funzione richiede due argomenti"); end
    x = [ ...
        2*x(1)*x(2)-4*x(1), x(1)*x(1)+1; ...
        exp(x(1)-1), exp(x(2)-2); ...
        ];
    return;
end


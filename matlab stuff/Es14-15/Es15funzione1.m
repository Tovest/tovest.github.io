function x = Es15funzione1(x)
    if length(x)~=2; error("Questa funzione richiede due argomenti"); end
    x = [ ...
        (x(1)*x(1)+1)*(x(2)-2); ...
        exp(x(1)-1)+exp(x(2)-2)-2 ...
        ];
    return;
end


function x = Es15funzione2(x)
    if length(x)~=3; error("Questa funzione richiede tre argomenti"); end
    x = [ ...
        x(1)-x(2)*x(3); ...
        exp(x(1)+x(2)+x(3)-3)-x(2); ...
        x(1)+x(2)+2*x(3)-4 ...
        ];
    return;
end

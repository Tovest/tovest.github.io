A = [ 1 3 2; 3 5 4; 5 7 6; 3 6 4; 1 4 2 ];
b = [ 15 28 41 33 22 ]';
D = diag(1:5);

[x,nr] = miaqr(A,b);

disp(table(A,b));
fprintf("\t      x da miaqr(A,b)\n\t\t__________________\n");
disp(x);
fprintf("Norma del Vettore residuo: %f\n\n\n\n",nr);

[xd,nrd] = miaqr(D*A,D*b);

ab = table(D*A,D*b);
ab.Properties.VariableNames = ["D*A","D*b"];
disp(ab);
fprintf("\t    x da miaqr(D*A,D*b)\n\t\t__________________\n");
disp(xd);
fprintf("Norma del Vettore residuo: %f\n\n\n\n",nrd);

vr_table = table(A*x-b,D*(A*xd-b),A*xd-b);
vr_table.Properties.VariableNames = ["Ax-b","DA(x2)-Db","A(x2)-b"];
disp(vr_table);
f = @(x) x-cos(pi*x/2);
f1 = @(x) 1+(pi/2)*sin(pi*x/2);

x0 = 1;
x1 = 0.99;

newton_risultati = ones(4,1);
newton_niter = ones(4,1);
newton_nfeval = ones(4,1);
[newton_risultati(1),newton_niter(1),newton_nfeval(1)] = newton("Es6funzione","Es6derivata",x0,1e-3,9999);
[newton_risultati(2),newton_niter(2),newton_nfeval(2)] = newton("Es6funzione","Es6derivata",x0,1e-6,9999);
[newton_risultati(3),newton_niter(3),newton_nfeval(3)] = newton("Es6funzione","Es6derivata",x0,1e-9,9999);
[newton_risultati(4),newton_niter(4),newton_nfeval(4)] = newton("Es6funzione","Es6derivata",x0,1e-12,9999);
newton_risultati(:) = Es6funzione(newton_risultati(:));
newton_table = table(newton_risultati,newton_niter,newton_nfeval);
newton_table.Properties.VariableNames = ["f(x*)","#iter","#f val."];

secanti_risultati = ones(4,1);
secanti_niter = ones(4,1);
secanti_nfeval = ones(4,1);
[secanti_risultati(1),secanti_niter(1),secanti_nfeval(1)] = secanti("Es6funzione","Es6derivata",x1,1e-3,9999);
[secanti_risultati(2),secanti_niter(2),secanti_nfeval(2)] = secanti("Es6funzione","Es6derivata",x1,1e-6,9999);
[secanti_risultati(3),secanti_niter(3),secanti_nfeval(3)] = secanti("Es6funzione","Es6derivata",x1,1e-9,9999);
[secanti_risultati(4),secanti_niter(4),secanti_nfeval(4)] = secanti("Es6funzione","Es6derivata",x1,1e-12,9999);
secanti_risultati(:) = Es6funzione(secanti_risultati(:));
secanti_table = table(secanti_risultati,secanti_niter,secanti_nfeval);
secanti_table.Properties.VariableNames = ["f(x*)","#iter","#f val."];

steffensen_risultati = ones(4,1);
steffensen_niter = ones(4,1);
steffensen_nfeval = ones(4,1);
[steffensen_risultati(1),steffensen_niter(1),steffensen_nfeval(1)] = steffensen("Es6funzione",x0,1e-3,9999);
[steffensen_risultati(2),steffensen_niter(2),steffensen_nfeval(2)] = steffensen("Es6funzione",x0,1e-6,9999);
[steffensen_risultati(3),steffensen_niter(3),steffensen_nfeval(3)] = steffensen("Es6funzione",x0,1e-9,9999);
[steffensen_risultati(4),steffensen_niter(4),steffensen_nfeval(4)] = steffensen("Es6funzione",x0,1e-12,9999);
steffensen_risultati(:) = Es6funzione(steffensen_risultati(:));
steffensen_table = table(steffensen_risultati,steffensen_niter,steffensen_nfeval);
steffensen_table.Properties.VariableNames = ["f(x*)","#iter","#f val."];

tolleranze_table = table(["1e-3";"1e-6";"1e-9";"1e-12"]);
tolleranze_table.Properties.VariableNames = "Tolleranze:";

final_table = table(tolleranze_table,newton_table,secanti_table,steffensen_table);
final_table.Properties.VariableNames = ["---","Newton","Secanti","Steffensen"];

disp(final_table);
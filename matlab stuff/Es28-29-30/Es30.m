tols = [1e-2; 1e-3; 1e-4; 1e-5; 1e-6];

nfeval_trap = ones(length(tols),1);
nfeval_simp = ones(length(tols),1);
res_trap = ones(length(tols),1);
res_simp = ones(length(tols),1);


for i=1:length(tols)
    tol = tols(i);
    [res_trap(i),nfeval_trap(i)] = adaptrap("Es30function",0,1,tol);
    [res_simp(i),nfeval_simp(i)] = adapsimp("Es30function",0,1,tol);
end


table_nfeval = table(nfeval_trap,nfeval_simp);
table_nfeval.Properties.VariableNames = ["Trapezi", "Simpson"];
table_res = table(res_trap,res_simp);
table_res.Properties.VariableNames = ["Trapezi", "Simpson"];
table_tol = table(["1e-2"; "1e-3"; "1e-4"; "1e-5"; "1e-6"]);
table_tol.Properties.VariableNames = "Tolleranza";

table_final = table(table_tol, table_nfeval, table_res);
table_final.Properties.VariableNames = ["---", "Num. di Valutazioni Funzionali", "Approssimazione dell'integrale"];
disp(table_final)

ns = [1;2;3;4;5;6;7;9];
tols = [1e-2, 1e-3, 1e-4, 1e-5, 1e-6];

m_nfeval = length(ns)*length(tols);
m_res = length(ns)*length(tols);

for i=1:length(ns)
    n = ns(i);
    for j=1:length(tols)
        tol = tols(j);
        [m_res(i,j),~,m_nfeval(i,j)] = composita("Es27function",0,1,n,tol);
    end
end

table_tol = table(m_nfeval(:,1),m_nfeval(:,2),m_nfeval(:,3),m_nfeval(:,4),m_nfeval(:,5));
table_tol.Properties.VariableNames = ["1e-2", "1e-3", "1e-4", "1e-5", "1e-6"];
table_nfeval = table(ns);
table_nfeval.Properties.VariableNames = "n:";
table_res = table(m_res(:,1),m_res(:,2),m_res(:,3),m_res(:,4),m_res(:,5));
table_res.Properties.VariableNames = ["1e-2", "1e-3", "1e-4", "1e-5", "1e-6"];

table_final = table(table_nfeval,table_tol,table_res);
table_final.Properties.VariableNames = ["Grado", "Num. di valutazioni funzionali con tolleranza:", "Approssimazione dell'integrale con tolleranza:"];
disp(table_final);
[r1_t3,i1_t3] = newton("Es15funzione1","Es15jacobiana1",[0,0],1e-3,9999);
[r1_t8,i1_t8] = newton("Es15funzione1","Es15jacobiana1",[0,0],1e-8,9999);
[r1_t13,i1_t13] = newton("Es15funzione1","Es15jacobiana1",[0,0],1e-13,9999);
[r2_t3,i2_t3] = newton("Es15funzione2","Es15jacobiana2",[0,0,0],1e-3,9999);
[r2_t8,i2_t8] = newton("Es15funzione2","Es15jacobiana2",[0,0,0],1e-8,9999);
[r2_t13,i2_t13] = newton("Es15funzione2","Es15jacobiana2",[0,0,0],1e-13,9999);



table_radici_1 = table(r1_t3, r1_t8, r1_t13);
table_radici_1.Properties.VariableNames = ["1e-3","1e-8","1e-13"];
table_iterazioni_1 = table(i1_t3, i1_t8, i1_t13);
table_iterazioni_1.Properties.VariableNames = ["1e-3","1e-8","1e-13"];

table_radici_2 = table(r2_t3, r2_t8, r2_t13);
table_radici_2.Properties.VariableNames = ["1e-3","1e-8","1e-13"];
table_iterazioni_2 = table(i2_t3, i2_t8, i2_t13);
table_iterazioni_2.Properties.VariableNames = ["1e-3","1e-8","1e-13"];

table_radici_1 = table(table_radici_1);
table_radici_1.Properties.VariableNames = "Appros. della radice di Funzione 1 con tolleranza:";

table_radici_2 = table(table_radici_2);
table_radici_2.Properties.VariableNames = "Appros. della radice di Funzione 2 con tolleranza:";

table_iterazioni_1 = table(table_iterazioni_1);
table_iterazioni_1.Properties.VariableNames = "Numero di iterazioni richieste da Funzione 1";

table_iterazioni_2 = table(table_iterazioni_2);
table_iterazioni_2.Properties.VariableNames = "Numero di iterazioni richieste da Funzione 2";

disp(table_radici_1);
disp(table_iterazioni_1);
disp(table_radici_2);
disp(table_iterazioni_2);
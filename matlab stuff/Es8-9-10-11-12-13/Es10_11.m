disp(">> Es10");
[es10_A1,b] = linsis(10,1);
x = mialu(es10_A1,b);
disp("--- mialu( linsis(10,1) ) ---");
disp(x);

[es10_A9,b] = linsis(10,9);
x = mialu(es10_A9,b);
disp("--- mialu( linsis(10,9) ) ---");
disp(x);

disp(">> Es11");
[es11_A1,b] = linsis(10,1,1);
x = mialdl(es11_A1,b);
disp("--- mialdl( linsis(10,1,1) ) ---");
disp(x);

[es11_A9,b] = linsis(10,9,1);
x = mialdl(es11_A9,b);
disp("--- mialdl( linsis(10,9,1) ) ---");
disp(x);

es10_A1_norme = [norm(es10_A1,2); norm(inv(es10_A1),2); NaN];
es10_A1_norme(3) = es10_A1_norme(1)*es10_A1_norme(2);

es10_A9_norme = [norm(es10_A9,2); norm(inv(es10_A9),2); NaN];
es10_A9_norme(3) = es10_A9_norme(1)*es10_A9_norme(2);

es11_A1_norme = [norm(es11_A1,2); norm(inv(es11_A1),2); NaN];
es11_A1_norme(3) = es11_A1_norme(1)*es11_A1_norme(2);

es11_A9_norme = [norm(es11_A9,2); norm(inv(es11_A9),2); NaN];
es11_A9_norme(3) = es11_A9_norme(1)*es11_A9_norme(2);

es_table = table(es10_A1_norme,es10_A9_norme,es11_A1_norme,es11_A9_norme);
es_table.Properties.VariableNames = ["linsis(10,1)","linsis(10,9)","linsis(10,1,1)","linsis(10,9,1)"];

ktype_table = table(["Norma 2";"Norma 2 inv(A)";"num. di cond."]);
ktype_table.Properties.VariableNames = "_____";

final_table = table(ktype_table,es_table);
final_table.Properties.VariableNames = ["___","Matrici -A- restituite da:"];
disp(final_table);

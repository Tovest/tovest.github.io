n = [(1:7)'; 9];
Pesi = NaN(length(n),max(n)+1);
for i=1:length(n)
    j = n(i);
    ncp = ncpesi(j);
    Pesi(i,1:length(ncp)) = ncp;
end

PesiString = "";
for i=1:length(n)
    j = n(i);
    PesiString(i) = strrep(string(rats(Pesi(i,1:j+1))),"    "," ");
end
PesiString = PesiString';
t = table(n,PesiString);
t.Properties.VariableNames = ["n","Pesi 0...n"];
disp(t);
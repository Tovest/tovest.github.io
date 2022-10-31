drop database if exists mostra_arte;
create database if not exists mostra_arte;
use mostra_arte;

############################################################################
################           Creazione database              #################
############################################################################

create table Persone(
codice_fiscale char(16) primary key,
nome varchar(20),
cognome varchar(20)
);

create table Artisti(
cf_artista char(16) primary key,
foreign key (cf_artista) references Persone(codice_fiscale),
nome_arte varchar(40) unique not null
);

create table Critici(
cf_critico char(16) primary key,
foreign key (cf_critico) references Persone(codice_fiscale),
qualifica varchar(20)
);

create table Personale(
cf_personale char(16) primary key,
foreign key (cf_personale) references Persone(codice_fiscale),
data_assunzione date
);

create table Opere(
codice_opera int auto_increment primary key,
titolo varchar(30)
);

create table Autori(
cf_artista char(16),
foreign key (cf_artista) references Artisti(cf_artista),
codice_opera int,
foreign key (codice_opera) references Opere(codice_opera),
primary key(cf_artista,codice_opera)
);

create table Voti(
cf_critico char(16),
foreign key (cf_critico) references Critici(cf_critico),
codice_opera int,
foreign key (codice_opera) references Opere(codice_opera),
primary key(cf_critico, codice_opera),
voto int,
constraint voti_ammessi check (voto >= 1 and voto <= 5),
commento varchar(255)
);

create table Zone(
codice_zona int auto_increment primary key,
tema varchar(20),
locazione varchar(50),
numero_visite int default 0
);

create table Incarichi(
codice_incarico int auto_increment primary key,
cf_personale char(16),
foreign key (cf_personale) references Personale(cf_personale),
codice_zona int,
foreign key (codice_zona) references Zone(codice_zona),
stipendio float,
ruolo varchar(20)
);

create table Padiglioni(
codice_zona int,
foreign key (codice_zona) references Zone(codice_zona),
numero_padiglione int,
primary key(codice_zona, numero_padiglione),
dimensione_m2 float
);

create table Esibizioni(
codice_opera int primary key,
foreign key (codice_opera) references Opere(codice_opera),
codice_zona int,
numero_padiglione int,
foreign key (codice_zona,numero_padiglione) references Padiglioni(codice_zona,numero_padiglione)
);

create table Prenotazioni(
codice_prenotazione int auto_increment primary key,
cf_artista char(16),
foreign key (cf_artista) references Artisti(cf_artista),
codice_zona int,
numero_padiglione int,
foreign key (codice_zona,numero_padiglione) references Padiglioni(codice_zona,numero_padiglione),
data_inizio date,
data_fine date,
constraint date_corrette_prenotazioni check (data_inizio <= data_fine)
);

create table Richieste(
codice_richiesta int auto_increment primary key,
cf_richiedente char(16),
foreign key (cf_richiedente) references Artisti(cf_artista),
data_inizio date,
data_fine date,
constraint date_corrette_richieste check (data_inizio <= data_fine),
stato enum('Accettata','Rifiutata','In Attesa') default 'In Attesa',
data_controllo date
);

create table Padiglioni_Richiesti(
codice_richiesta int,
foreign key (codice_richiesta) references Richieste(codice_richiesta),
codice_zona int,
numero_padiglione int,
foreign key (codice_zona,numero_padiglione) references Padiglioni(codice_zona,numero_padiglione),
primary key(codice_richiesta,codice_zona,numero_padiglione)
);

create table Biglietti(
codice_biglietto int auto_increment primary key,
data_validita date,
tempo_acquisto datetime,
constraint data_validita_non_prima_data_acquisto check (data_validita >= date(tempo_acquisto))
);

create table Tessere(
codice_tessera int auto_increment primary key,
nome varchar(20),
cognome varchar(20)
);

create table Visite_con_Biglietto(
codice_visita int auto_increment primary key,
codice_biglietto int,
foreign key (codice_biglietto) references Biglietti(codice_biglietto),
codice_zona int,
foreign key (codice_zona) references Zone(codice_zona),
tempo_visita datetime
);

create table Visite_con_Tessera(
codice_visita int auto_increment primary key,
codice_tessera int,
foreign key (codice_tessera) references Tessere(codice_tessera),
codice_zona int,
foreign key (codice_zona) references Zone(codice_zona),
tempo_visita datetime
);

create table Prenotazioni_Passate(
codice_prenotazione int,
cf_artista char(16),
foreign key (cf_artista) references Artisti(cf_artista),
codice_zona int,
numero_padiglione int,
foreign key (codice_zona,numero_padiglione) references Padiglioni(codice_zona,numero_padiglione),
data_inizio date,
data_fine date
);



############################################################################
################            Popolamento database           #################
############################################################################

#select * from Persone;
insert into Persone values
('AR-1', 'Adolfo', 'A'),
('AR-2', 'Adriano', 'A'),
('AR-3', 'Agostino', 'A'),
('AR-4', 'Alberto', 'A'),
('AR-Coll-1', 'Aldo', 'A'),
('AR-Coll-2', 'Alessandro', 'A'),
('AR-Coll-3', 'Alfredo', 'A'),
('CR-1', 'Carlo', 'C'),
('CR-2', 'Cesare', 'C'),
('CR-3', 'Claudio', 'C'),
('PE-1', 'Paolo', 'P'),
('PE-2', 'Pasquale', 'P'),
('PE-3', 'Patrizio', 'P'),
('PE-4', 'Pietro', 'P'),
('PE-5', 'Patrizia ', 'P'),
('PE-6', 'Penelope', 'P'),
('Ar/Cr', 'Edoardo', 'ArCr'),
('Cr/Pe', 'Elisabetta', 'CrPe');

#select * from Artisti;
insert into Artisti values
('AR-1', 'Adolfo'),
('AR-2', 'Adriano'),
('AR-3', 'Agostino'),
('AR-4', 'Alberto'),
('AR-Coll-1', 'Collaboratore-1'),
('AR-Coll-2', 'Collaboratore-2'),
('AR-Coll-3', 'Collaboratore-3'),
('Ar/Cr', 'Edoardo');

#select * from Critici;
insert into Critici values
('CR-1', 'Qlfc-1'),
('CR-2', 'Qlfc-2'),
('CR-3', 'Qlfc-3'),
('Ar/Cr', 'Qlfc-4'),
('Cr/Pe', 'Qlfc-5');

#select * from Personale;
insert into Personale(cf_personale,data_assunzione) values
('PE-1', '2020-01-01'),
('PE-2', '2020-01-02'),
('PE-3', '2020-01-03'),
('PE-4', '2020-01-04'),
('PE-5', '2020-01-05'),
('PE-6', '2020-01-06'),
('Cr/Pe', '2020-01-07');

#select * from Opere;
insert into Opere(titolo) values
('Opera-Adolfo-1'),
('Opera-Adolfo-2'),
('Opera-Adriano-1'),
('Opera-Adriano-2'),
('Opera-Agostino'),
('Opera-Alberto'),
('Opera-Coll-1'),
('Opera-Collaborazione'),
('Opera-Edoardo');

#select * from Autori;
insert into Autori values
('AR-1', 1),
('AR-1', 2),
('AR-2', 3),
('AR-2', 4),
('AR-3', 5),
('AR-4', 6),
('AR-Coll-1', 7),
('AR-Coll-1', 8),
('AR-Coll-2', 8),
('AR-Coll-3', 8),
('Ar/Cr', 9);

#select * from Voti;
insert into Voti values
('CR-1', 1, 5, 'COMMENT-1'),
('CR-2', 1, 4, 'COMMENT-2'),
('CR-3', 1, 4, 'COMMENT-3'),
('CR-1', 8, 5, 'COMMENT-4'),
('CR-2', 8, 4, 'COMMENT-5'),
('CR-3', 8, 5, 'COMMENT-6'),
('CR-3', 3, 4, 'COMMENT-7'),
('Cr/Pe', 3, 5, 'COMMENT-8'),
('Cr/Pe', 4, 4, 'COMMENT-9'),
('Cr/Pe', 5, 5, 'COMMENT-10'),
('Cr/Pe', 7, 4, 'COMMENT-11');

#select * from Zone;
insert into Zone(tema,locazione,numero_visite) values
('Tema-1', 'Loc-1', 4),
('Tema-2', 'Loc-2', 5),
('Tema-3', 'Loc-3', 4);

#select * from Incarichi;
insert into Incarichi(cf_personale,codice_zona,stipendio,ruolo) values
('PE-1', 1, 100, 'Job-A'),
('PE-2', 1, 100, 'Job-B'),
('PE-3', 1, 100, 'Job-C'),
('PE-4', 2, 200, 'Job-A'),
('PE-5', 2, 200, 'Job-B'),
('PE-6', 2, 200, 'Job-C'),
('PE-2', 3, 300, 'Job-A'),
('PE-4', 3, 300, 'Job-B'),
('PE-6', 3, 300, 'Job-C'),
('Cr/Pe', 2, 500, 'Job-E');

#select * from Padiglioni;
insert into Padiglioni values
(1,1, 11),
(1,2, 12),
(1,3, 13),
(2,1, 21),
(2,2, 22),
(2,3, 23),
(3,1, 31),
(3,2, 32),
(3,3, 33);

#select * from Esibizioni;
insert into Esibizioni values
(1, 1,1),
(2, 1,1),
(3, 1,2),
(4, 1,2),
(5, 1,3),
(8, 2,1);

#select * from Prenotazioni;
insert into Prenotazioni(cf_artista,codice_zona,numero_padiglione,data_inizio,data_fine) values
('Ar-1', 1,1, '2021-03-01', '2021-05-30'),
('Ar-2', 1,2, '2021-03-01', '2021-08-30'),
('Ar-3', 1,3, '2021-03-01', '2021-08-30'),
('Ar-Coll-2', 2,1, '2021-03-01', '2021-05-30'),
('Ar-Coll-3', 2,1, '2021-06-01', '2021-8-30'),
('Ar-Coll-1', 3,2, '2021-06-01', '2021-8-30'),
('Ar-Coll-1', 3,3, '2021-06-01', '2021-8-30');

#select * from Richieste;
insert into Richieste(cf_richiedente,data_inizio,data_fine) values
('AR-Coll-1', '2021-06-01','2021-08-30'),		# Due delle '3' richieste non vanno bene	= Rifiutata
('AR-4', '2021-07-01','2021-09-30'),			# La '1' richiesta non va bene				= Rifiutata
('Ar/Cr', '2022-01-01','2022-03-30'),			# La '1' richiesta va bene					= Accettata
('Ar/Cr', '2022-01-01','2022-03-30');			# Le '4' richieste vanno bene				= Accettata

#select * from Padiglioni_Richiesti;
insert into Padiglioni_Richiesti values
(1, 1,1),
(1, 1,2),
(1, 1,3),
(2, 2,1),
(3, 1,1),
(4, 1,2),
(4, 1,3),
(4, 2,1),
(4, 2,2);

#select * from Biglietti;
insert into Biglietti(data_validita,tempo_acquisto) values
('2021-06-15', '2021-06-15 12:00:00'),
('2021-07-15', '2021-07-10 12:00:00'),
('2021-08-15', '2021-08-05 12:00:00');

#select * from Tessere;
insert into Tessere(nome,cognome) values
('Mario', 'Rossi'),
('Luigi', 'Verdi'),
('Tina', 'Bianchi'),
('Adolfo', 'A'),
('Adriano', 'A'),
('Agostino', 'A'),
('Alberto', 'A'),
('Aldo', 'A'),
('Alessandro', 'A'),
('Alfredo', 'A'),
('Carlo', 'C'),
('Cesare', 'C'),
('Claudio', 'C'),
('Paolo', 'P'),
('Pasquale', 'P'),
('Patrizio', 'P'),
('Pietro', 'P'),
('Patrizia ', 'P'),
('Penelope', 'P'),
('Edoardo', 'ArCr'),
('Elisabetta', 'CrPe');

#select * from Visite_con_Biglietto;
insert into Visite_con_Biglietto(codice_biglietto,codice_zona,tempo_visita) values
(1, 1, '2021-06-14 10:00'),
(2, 2, '2021-06-14 15:00'),
(3, 3, '2021-06-14 20:00'),
(2, 3, '2021-06-15 05:00'),
(2, 2, '2021-06-15 15:00'),
(1, 1, '2021-06-15 15:00');

#select * from Visite_con_Tessera;
insert into Visite_con_Tessera(codice_tessera,codice_zona,tempo_visita) values
(2, 3, '2021-06-14 05:00'),
(1, 2, '2021-06-14 05:00'),
(2, 1, '2021-06-14 20:00'),
(1, 2, '2021-06-15 05:00'),
(3, 1, '2021-06-15 05:00'),
(1, 3, '2021-06-15 15:00'),
(2, 2, '2021-06-15 20:00');



############################################################################
################              		Query				   #################
############################################################################

	###\
	### | INTERROGAZIONE: Mostrare i titoli ed il nome d'arte degli autori per ogni opera (assieme al codice dell'opera)										I-----[ Interrogazione ]-----I
	###/

select codice_opera,titolo,group_concat(nome_arte) as autori from Opere natural join Autori natural join Artisti group by codice_opera;



	###\
	### | INTERROGAZIONE: Mostrare tutte le persone con le loro occupazioni, una riga per persona																I-----[ Interrogazione ]-----I
	###/

select nome,cognome,group_concat(occupazione) as occupazioni from
(select codice_fiscale,nome,cognome,'Artista' as occupazione from Persone X join Artisti Ar on X.codice_fiscale=Ar.cf_artista
UNION select codice_fiscale,nome,cognome,'Critico' as occupazione from Persone X join Critici Cr on X.codice_fiscale=Cr.cf_critico
UNION select codice_fiscale,nome,cognome,'Personale' as occupazione from Persone X join Personale Pe on X.codice_fiscale=Pe.cf_personale) X
group by codice_fiscale order by nome,cognome;



	###\
	### | INTERROGAZIONE: Mostrare tutti gli incarichi assegnati ad ogni persona																				I-----[ Interrogazione ]-----I
	###/

select nome,cognome,ruolo,locazione from Persone X
join Personale P on X.codice_fiscale=P.cf_personale
join Incarichi I on P.cf_personale=I.cf_personale
join Zone Z on I.codice_zona=Z.codice_zona
order by nome,cognome;



	###\
	### | INTERROGAZIONE: Mostrare la locazione delle opere con il titolo ed i nomi d'arte degli autori															I-----[ Interrogazione ]-----I
	###/

select titolo as titolo_opera,group_concat(nome_arte) as autori,concat(locazione,' ,   n.',numero_padiglione) as padiglione
from Artisti Ar
join Autori Au on Ar.cf_artista=Au.cf_artista
join Opere Op on Au.codice_opera=Op.codice_opera
join Esibizioni Es on Op.codice_opera=Es.codice_opera
join Zone Zo on Es.codice_zona=Zo.codice_zona
group by Op.codice_opera
order by titolo_opera;



	###\
	### | INTERROGAZIONE: Mostrare i possibili padiglioni dove esibire le opere (al giorno d'oggi)																I-----[ Interrogazione ]-----I
	###/

select titolo as titolo_opera,autori,concat(locazione,' ,   n.',numero_padiglione) as possibile_padiglione
from Opere natural join Autori natural join Prenotazioni natural join Zone
natural join
(select codice_opera,titolo,group_concat(nome_arte) as autori from Opere natural join Autori natural join Artisti group by codice_opera) X
where current_date() between data_inizio and data_fine
order by codice_opera;



	###\
	### | INTERROGAZIONE: Mostrare tutte le opere con il nome d'arte dei suoi artisti, la media dei voti, ed il numero di voti									I-----[ Interrogazione ]-----I
	###/

select titolo,autori,media_voti,numero_voti from
	(select codice_opera,avg(voto) as media_voti,count(*) as numero_voti
	from Opere natural join Voti
	group by codice_opera) X
natural join
	(select codice_opera,group_concat(nome_arte) as Autori
	from Autori Au
	join Artisti Ar on Au.cf_artista=Ar.cf_artista
	group by codice_opera) Y
natural join
	Opere;



############################################################################
################              Viste                        #################
############################################################################

	###\
	### | VISTA: Impedisci di esibire opere nei padiglioni non prenotati dall'autore (al giorno d'oggi)															V-----[ Vista ]-----V
	###/

create view Esibizioni_Legali as
select * from Esibizioni
where ((codice_opera,codice_zona,numero_padiglione) in (
select Op.codice_opera,Pr.codice_zona,Pr.numero_padiglione
from Opere Op
join Autori Au on Op.codice_opera=Au.codice_opera
join Prenotazioni Pr on Au.cf_artista=Pr.cf_artista
where current_date() between Pr.data_inizio and Pr.data_fine))
with local check option;



	###\
	### | VISTA: Impedisci visite con biglietto se la data di validità non è quella corretta																	V-----[ Vista ]-----V
	###/

create view Visite_con_Biglietto_Legali as
select * from Visite_con_Biglietto V
where (date(tempo_visita) in (select data_validita from Biglietti B where V.codice_biglietto=B.codice_biglietto))
with local check option;



	###\
	### | VISTA: Impedisci votazioni su opere non esposte																										V-----[ Vista ]-----V
	###/

create view Voti_Opere_in_Esibizione as
select * from Voti
where codice_opera in (select codice_opera from Esibizioni)
with local check option;



	###\
	### | VISTA: Mostra tutte le visite, sia di biglietti e tessere insieme distinguendo i tipi																	V-----[ Vista ]-----V
	###/

create view Visite as
(select 'Biglietto' as tipo_invito,codice_biglietto as codice_invito,codice_zona,tempo_visita from Visite_con_Biglietto
UNION
select 'Tessera' as tipo_invito,codice_tessera as codice_invito,codice_zona,tempo_visita from Visite_con_Tessera)
order by tempo_visita,tipo_invito,codice_invito;



	###\
	### | FUNZIONE: Restituisci vero se due periodi di tempo si sovrappongono																					F-----[ Funzione ]-----F
	###/

DELIMITER $$
create function sono_sovrapposte(i1 date, f1 date, i2 date, f2 date)
returns int
language sql
deterministic
begin
	declare result bool;
	select ((i1 between i2 and f2) or (f1 between i2 and f2) or (i1 <= i2 and f1 >= f2) or (i1 >= i2 and f1 <= f2)) into result;
	return result;
end $$
DELIMITER ;



	###\
	### | VISTA: Seleziona tutte le richieste in attesa per padiglioni già assegnati tra le date richieste														V-----[ Vista ]-----V
	###/

create view Richieste_Non_Accettabili as
select * from Padiglioni_Richiesti natural join Richieste Richiesta
where stato='In Attesa' and (codice_zona,numero_padiglione) in
	(select codice_zona,numero_padiglione from Prenotazioni Prenotazione
	where sono_sovrapposte(Richiesta.data_inizio, Richiesta.data_fine, Prenotazione.data_inizio, Prenotazione.data_fine));



############################################################################
################             Funzioni                      #################
############################################################################

	###\
	### | FUNZIONE: Restituisci il codice di un'opera dato il titolo ed il nome d'arte dell'artista																F-----[ Funzione ]-----F
	###/

DELIMITER $$
create function codice_opera(t varchar(30), na varchar(40))
returns int
language sql
deterministic
begin
	declare cod int default -1;
	select Op.codice_opera into cod
	from Opere Op
	join Autori Au on Op.codice_opera=Au.codice_opera
	join Artisti Ar on Au.cf_artista=Ar.cf_artista
	where Op.titolo=t and Ar.nome_arte=na;
	return cod;
end $$
DELIMITER ;



	###\
	### | FUNZIONE: Restituisci l'ultima zona visitata da un biglietto o una tessera prima di una certa data ed ora												F-----[ Funzione ]-----F
	###/

DELIMITER $$
create function ultima_visita(tipo enum('Biglietto','Tessera'), cod int, t datetime)
returns int
language sql
deterministic
begin
	declare zona int;
	case tipo
		when 'Biglietto' then 
		select codice_zona into zona from
			Visite_con_Biglietto where codice_biglietto=cod and tempo_visita = (select max(tempo_visita) from Visite_con_Biglietto where codice_biglietto=cod and tempo_visita<=t);
		when 'Tessera' then
		select codice_zona into zona from
			Visite_con_Tessera where codice_tessera=cod and tempo_visita = (select max(tempo_visita) from Visite_con_Tessera where codice_tessera=cod and tempo_visita<=t);
	end case;
	return zona;
end $$
DELIMITER ;



############################################################################
################              Procedure                    #################
############################################################################

	###\
	### | PROCEDURA: Mostra quali padiglioni sono liberi tra due date																							P-----[ Procedura ]-----P
	###/

DELIMITER $$
create procedure padiglioni_liberi_tra(di date, df date)
begin
	select * from Padiglioni where ((codice_zona,numero_padiglione)
	not in (select codice_zona,numero_padiglione from Prenotazioni P
	where sono_sovrapposte(P.data_inizio,P.data_fine,di,df)));
end $$
DELIMITER ;



	###\
	### | PROCEDURA: Crea nuovo biglietto																														P-----[ Procedura ]-----P
	###/

DELIMITER $$
create procedure crea_biglietto(dv date)
begin
	insert into Biglietti(data_validita,tempo_acquisto) values (dv,now());
end $$
DELIMITER ;



	###\
	### | PROCEDURA: Crea nuova tessera																															P-----[ Procedura ]-----P
	###/

DELIMITER $$
create procedure crea_tessera(nome varchar(20), cognome varchar(20))
begin
	insert into Tessere(nome,cognome) values (nome,cognome);
end $$
DELIMITER ;



	###\
	### | PROCEDURA: Registra una nuova visita passando come argomento il tipo di invito ed il codice associato													P-----[ Procedura ]-----P
	###/
    
DELIMITER $$
create procedure nuova_visita(tipo enum('Biglietto','Tessera'), codice int, zona int)
begin
	case tipo
	when 'Biglietto' then
		insert into Visite_con_Biglietto_Legali(codice_biglietto,codice_zona,tempo_visita)
		value (codice,zona,now());
	when 'Tessera' then
		insert into Visite_con_Tessera(codice_tessera,codice_zona,tempo_visita)
		values (codice,zona,now());
	end case;
end $$
DELIMITER ;



	###\
	### | PROCEDURA: gestisci una richiesta in attesa, accetta solo se i padiglioni richiesti non sono già stati prenotati, rifuta altrimenti					P-----[ Procedura ]-----P
	###/
    
DELIMITER $$
create procedure gestisci_richiesta(cod int)
body: begin
	declare var_artista char(16);
	declare var_zona int;
	declare var_padiglione int;
	declare var_data_inizio date;
	declare var_data_fine date;
	declare var_stop bool default false;
	declare read_padiglioni_richiesti cursor for (select codice_zona,numero_padiglione from Padiglioni_Richiesti where codice_richiesta=cod);
	declare CONTINUE handler for NOT FOUND set var_stop = true;
	if (cod not in (select codice_richiesta from richieste))
		then select 'Codice richiesta inesistente' as 'Gestione impedita';
		leave body;
	end if;
	if (select stato from Richieste where codice_richiesta=cod)!='In Attesa'
		then select 'Questa richiesta è già stata controllata' as 'Gestione impedita';
		leave body;
	end if;
	if exists (select * from Richieste_Non_Accettabili where codice_richiesta=cod)
		then update Richieste set stato='Rifiutata',data_controllo=current_date() where codice_richiesta=cod;
		select 'Uno o più padiglioni sono già prenotati per quelle date' as 'Richiesta rifiutata';
		leave body;
	end if;
	update Richieste set stato='Accettata',data_controllo=current_date() where codice_richiesta=cod;
	select cf_richiedente into var_artista from Richieste where codice_richiesta=cod;
	select data_inizio into var_data_inizio from Richieste where codice_richiesta=cod;
	select data_fine into var_data_fine from Richieste where codice_richiesta=cod;
	open read_padiglioni_richiesti;
	fetch read_padiglioni_richiesti into var_zona,var_padiglione;
	while (var_stop=false) do
		insert into Prenotazioni(cf_artista,codice_zona,numero_padiglione,data_inizio,data_fine) value (var_artista,var_zona,var_padiglione,var_data_inizio,var_data_fine);
		fetch read_padiglioni_richiesti into var_zona,var_padiglione;
	end while;
	close read_padiglioni_richiesti;
	select 'Le prenotazioni sono state automaticamente inserite' as 'Richiesta accettata';
end $$
DELIMITER ;



	###\
	### | PROCEDURA: Aggiorna il database al giorno d'oggi																										P-----[ Procedura ]-----P
	###/

DELIMITER $$
create procedure aggiornamento_giornaliero()
begin
	delete from Prenotazioni where data_fine < current_date();
end $$
DELIMITER ;



	###\
	### | PROCEDURA: Determina tutte le possibili presenze in un certo periodo di tempo, preciso fino al secondo												P-----[ Procedura ]-----P
	###/

DELIMITER $$
create procedure possibili_presenze_in_zona(zona int, ti datetime, tf datetime)
begin
	select * from Visite where codice_zona=zona and
	( (tempo_visita between ti and tf) or ( (tempo_visita <= ti) and (ultima_visita(tipo_invito,codice_invito,ti) = zona) ) );
end $$
DELIMITER ;



############################################################################
################              Trigger                      #################
############################################################################

	###\
	### | TRIGGER: Aggiorna	automaticamente l'attributo "numero_visite" di una zona																				T-----[ Trigger ]-----T
	###/

DELIMITER $$
create trigger aggiorna_numero_visite_zona_con_biglietto after insert on Visite_con_Biglietto
for each row
begin
	declare val int;
	select numero_visite into val from Zone where codice_zona=NEW.codice_zona;
	set val = val+1;
	update Zone set numero_visite=val where codice_zona=NEW.codice_zona;
end $$

create trigger aggiorna_numero_visite_zona_con_tessera after insert on Visite_con_Tessera
for each row
begin
	declare val int;
	select numero_visite into val from Zone where codice_zona=NEW.codice_zona;
	set val = val+1;
	update Zone set numero_visite=val where codice_zona=NEW.codice_zona;
end $$
DELIMITER ;



	###\
	### | TRIGGER: salva le prenotazioni passate																												T-----[ Trigger ]-----T
	###/

DELIMITER $$
create trigger salva_prenotazioni_passate before delete on Prenotazioni
for each row
begin
	insert into Prenotazioni_Passate value
	(OLD.codice_prenotazione,OLD.cf_artista,OLD.codice_zona,OLD.numero_padiglione,OLD.data_inizio,OLD.data_fine);
end $$
DELIMITER ;



	###\
	### | TRIGGER: automaticamente assegna una tessera per ogni Artista, Critico e Personale																	T-----[ Trigger ]-----T
	###/

DELIMITER $$
create trigger crea_tessere_per_i_registrati after insert on Persone
for each row
begin
	insert into Tessere(nome,cognome) value
	(NEW.nome,NEW.cognome);
end $$
DELIMITER ;

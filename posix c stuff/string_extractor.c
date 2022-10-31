#include <stdlib.h>
#include <unistd.h>
#include "string_extractor.h"

//
//	""" getNextLine """
// Dato un File Descriptor, la funzione restituisce un puntatore ad una copia del testo contenuto nel file
// a partire dal puntatore interno fino al primo carattere '\n' che trova o la fine del file.
// Viene restituito un NULL pointer se non c'è niente da leggere.
//
// L'argomento "returnCount" è un puntatore di tipo "int", il valore puntato
// sarà aggiornato al numero di caratteri letti una volta terminata la funzione.
//
// NOTA: l'area di memoria dovrebbe essere deallocata con free() quando il puntatore non serve più.
// Secondo il manuale "realloc" dealloca automaticamente l'area di memoria nel caso il puntatore cambi.
//
char* getNextLine(int fd, unsigned int *returnCount) {
	unsigned int spaceSize = 64;
	char *copyPtr = (char*) calloc(spaceSize, sizeof(char));
	char nextChar;
	//Controllo iniziale per determinare se siamo alla fine del file, in caso lo siamo viene restituito un NULL pointer
	if (read(fd, &nextChar, 1) <= 0) {
		*returnCount = 0;
		return NULL;
	}
	//Se il primo carattere è '\n' allora la riga è vuota, quindi viene restituita una stringa vuota
	if (nextChar == '\n') {
		*returnCount = 0;
		return copyPtr;
	}
	unsigned int offset = 0;
	//Loop per copiare carattere per carattere nella area di memoria allocata
	do {
		*(copyPtr + offset) = nextChar;
		offset++;
		//Se non c'è più spazio nella area di memoria allocata allora il contenuto viene riallocato in uno spazio più grande
		if (offset >= spaceSize) {
			spaceSize += 64;
			copyPtr = (char*) realloc(copyPtr, spaceSize*sizeof(char));
		}
	//Salva il prossimo carattere da leggere (in nextChar) e
	//continua il loop per copiare solo se la lettura non fallisce ed il carattere non è '\n'
	} while (read(fd, &nextChar, 1) > 0 && nextChar != '\n');
	*returnCount = offset;
	return copyPtr;
}

//
//	""" splitCSVRow """
// Dato un puntatore ad un carattere di una stringa (startingPoint), questa funzione modifica la prima virgola che trova in '\0',
// in questo modo divide la stringa originale, ed il puntatore startingPoint ora fa riferimento ad una sola stringa tra le virgole.
//
// Viene restituito vero (1) se viene eseguita la separazione, altrimenti falso (0) (quindi il valore era l'ultimo della stringa).
// Deve essere passato come argomento un puntatore returnCount, il valore puntato sarà sostituito con il numero di caratteri tra
// startingPoint e la prima virgola trovata o '\0' (cioè la lunghezza della stringa se startingPoint era sul primo carattere).
//
// Una volta finita la funzione il puntatore startingPoint punterà alla stringa estratta.
//
int splitCSVRow(char *startingPoint, unsigned int *returnCount) {	
	unsigned int offset = 0;
	while (1) {
		if (*(startingPoint + offset) == ',') {
			*(startingPoint + offset) = '\0';
			*returnCount = offset;
			//Separazione eseguita, quindi restituisci vero
			return 1;
		}
		if (*(startingPoint + offset) == '\0') {
			*returnCount = offset;
			return 0;
		}
		offset++;
	}
}

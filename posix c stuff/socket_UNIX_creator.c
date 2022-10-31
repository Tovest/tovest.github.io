#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <string.h>
#include "socket_UNIX_creator.h"

//
//	""" newServer """
// Questa funzione nasconde il procedimento di creazione della socket del server,
// restituendo direttamente il file descriptor riferito alla socket e permettendo
// alle sockets dei client di connetersi.
// E' necessario specificare il pathname da usare per collegarsi
// ed il numero massimo di connesioni che vogliamo permettere in coda.
//
int newServer(char *pathname, int maxPendingConnections) {
	struct sockaddr_un serverUNIXAddress;
	serverUNIXAddress.sun_family = AF_UNIX;
	unlink(pathname);
	strcpy(serverUNIXAddress.sun_path, pathname);
	int serverFd = socket(AF_UNIX, SOCK_STREAM, 0);
	bind(serverFd, (struct sockaddr*) &serverUNIXAddress, sizeof(serverUNIXAddress));
	listen(serverFd, maxPendingConnections);
	return serverFd;
}

//
//	""" acceptConnectionTo """
// Questa funzione nasonde il procedimento richiesto per accettare una connesione
// alla socket server riferita dal file descriptor passato come argomento, restituendo una
// volta avvenuta una connesione il file descriptor da usare per comunicare con il client.
//
int acceptConnectionTo(int serverFd) {
	//struct sockaddr_un clientUNIXAddress;
	//int clientLen = sizeof(clientUNIXAddress);
	//return accept(serverFd, (struct sockaddr*) &clientUNIXAddress, &clientLen);
	// No need for the "address of the peer socket" (from the manual)
	return accept(serverFd, NULL, NULL);
}

//
//	""" connectTo """
// Questa funzione nasconde il procedimento richiesto per comunicare con un server,
// gestendo il collegamento di una socket del client all'indirizzo passato come argomento.
// Una volta eseguita la connesione con il server viene restituito il file descriptor da usare
// per comunicare con il server.
//
int connectTo(char *pathname) {
	struct sockaddr_un serverUNIXAddress;
	serverUNIXAddress.sun_family = AF_UNIX;
	strcpy(serverUNIXAddress.sun_path, pathname);
	int clientFd = socket(AF_UNIX, SOCK_STREAM, 0);
	while (connect(clientFd, (struct sockaddr*) &serverUNIXAddress, sizeof(serverUNIXAddress)) == -1) sleep(1);
	return clientFd;
}

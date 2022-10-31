int newServer(char *pathname, int maxPendingConnections);
int acceptConnectionTo(int serverFd);
int connectTo(char *pathname);

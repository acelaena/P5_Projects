void bi_sstat(int argc, char** argv){
  
  int argv_i=0;              //index of argv

  FILE fd;                   //opened file
  
  struct stat argvstruct;    //for statting stat a file
  int err = 0;               //for stat error returns

  struct passwd usrstruct;   //user struct
  struct group grpstruct;    //group struct

  char *usrname;             //name of user
  char *grpname;             //name of group

  char perm[12];             //passed into strmode to get permissions
  int permstart = 1;         //index for when the permissions start

  char *modtime;             //last time modified
  
  //for every file after sstat, create a line and print it
  while (argv[argv_i] != NULL){

    argv_i++;

    fd = fopen(argv[argv_i], "r");
    
    err = fstat(fd, argvstruct);
    if (err == -1) continue;

    usrstruct = getpwuid(*(argvstruct->st_uid));
    if (usrstruct == NULL){
      sprintf(usrname, "%d", usrstruct.pw_uid);
    }
    else{
      sprintf(usrname, "%s", usrstruct.pw_name);
    }

    grpstruct = getgrgid(*(argvstruct->st_gid));
    if (grpstruct == NULL){
      sprintf(grpname, "%d", grpstruct.gr_gid);
    }
    else{
      sprintf(grpname, "%s", grpstruct.gr_name);
    }

    strmode(&(argvstruct->st_mode), perm);

    modtime = localtime(asctime(argvstruct->st_mtim.tv_sec));
      
    dprintf(1, "%s ", argv[argv_i]);
    dprintf(1, "%s ", usrname);
    dprintf(1, "%s ", grpname);
    dprintf(1, "%d ", perm[permstart]);
    dprintf(1, "%ld ", argvstruct.st_nlink);
    dprintf(1, "%ld ", argvstruct.st_size);
    dprintf(1, "%s\n", modtime);
    
  }

}
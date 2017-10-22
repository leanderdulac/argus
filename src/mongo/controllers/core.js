import chalk from 'chalk';

function ControllerCore(Model) {

  function isDuplicateKeyError(error) {
    const DUPLICATE_KEY_ERROR_CODE = 11000;
    return error.code === DUPLICATE_KEY_ERROR_CODE;
  }

  return {
    save: (spec) => {
      let newDocument = new Model(spec);
      return newDocument.save()
      .then( result => result )
      .catch( err => {

        if( isDuplicateKeyError(err) ) {
          return Model.findOne(spec)
          .then( foundDocument => {
            if( foundDocument ) {
              return foundDocument;
            }
          });
        }

        console.log(chalk.red('Mongo Operation: ') + err)
      });
    }
  }
}

export default ControllerCore;

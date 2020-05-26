import {
    grey,
} from '@material-ui/core/colors';

export default () => ({
    root: {
        minWidth: 275,
        backgroundColor: grey[500],
        minHeight: '100vh',
      },
      title: {
        fontSize: 14,
      },
      image: {
          height: 50,
          padding: 50,
          position: 'absolute',
          bottom: 0,
      },
      logRegForm: {
        backgroundColor: grey[500],
          float:'right',
          marginRight:'20%',
          marginTop:'10%',
      },
      greyColor: {
          backgroundColor: grey[700],
      },
      whiteColor: {
          backgroundColor: 'white',
      },
      form: {
        backgroundColor: 'white',
        padding:20
      },
      formButton: {
          color:'white',
      }
  });
  
import * as Yup from 'yup';

export const SystemSchema = Yup.object().shape({
    systemName: Yup.string()
      .required('Required'),
      systemManager: Yup.string()
      .required('Required'),
      
  });

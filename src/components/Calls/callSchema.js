import * as Yup from 'yup';

export const CallSchema = Yup.object().shape({
  system: Yup.string()
      .required('Required'),
    userName: Yup.string()
      .required('Required'),
      assignee: Yup.string(),
      team: Yup.string(),
      // .required('Required'),
      status: Yup.string(),
      // .required('Required'),
      description: Yup.string()
      .required('Required'),
      link : Yup.string()
  });

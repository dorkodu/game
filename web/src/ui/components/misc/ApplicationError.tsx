import { Text, Title } from '@mantine/core'

interface ApplicationErrorProps {
  error: Error
}

const ApplicationError: React.FC<ApplicationErrorProps> = ({ error }) => {
  return (
    <div>
      <Title order={1}>Oops!</Title>
      <Title order={2}>An error occured in the app.</Title>
      <Text>{import.meta.env.DEV && error.message}</Text>
    </div>
  );
};

export default ApplicationError;
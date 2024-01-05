import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { SimpleFooter } from "@/widgets/layout";
import getFromDato from '../data/datocms-data';

export function SignUp() {
  const [data, setData] = useState('');

  useEffect(() => {
    getFromDato(
      `
      query {
        misc {
          name
          email
          password
          login
          signUp
          alreadyHaveAccount
          iAgree
        }
      }
      `
    )
      .then(res => {
        setData(res);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  if (!data) {
    return (
      <>
        <div className="w-full h-full fixed top-0 left-0 bg-black/75 z-50">
          <div className="flex justify-center items-center mt-[50vh]">
            <div className="fas fa-circle-notch fa-spin fa-5x text-white"></div>
          </div>
        </div>
      </>
    );
  }

  if (data) {
    return (
      <>
        <img
          src="/img/background-2.jpg"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
        <div className="container mx-auto p-4">
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
            <CardHeader
              variant="gradient"
              color="blue-gray"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                {data.misc.signUp}
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input variant="standard" label={data.misc.name} size="lg" />
              <Input variant="standard" type="email" label={data.misc.email} size="lg" />
              <Input
                variant="standard"
                type="password"
                label={data.misc.password}
                size="lg"
              />
              <div className="-ml-2.5">
                <Checkbox label={data.misc.iAgree} />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" color="blue-gray" fullWidth>
                {data.misc.signUp}
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                {data.misc.alreadyHaveAccount}
                <Link to="/sign-in">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    {data.misc.login}
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </div>
        <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
          <SimpleFooter />
        </div>
      </>
    );
  }
}

export default SignUp;

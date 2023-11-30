import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import config from "../config/config";

export function Home() {
  const [fullName, setFullName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [hours, setHours] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkIsMobile);
    checkIsMobile();
    setHours(Math.floor(Math.random() * (24 - 12 + 1)) + 12)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const validateEmail = (email) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (email.length < 1) {
      return true
    } else {
      return emailPattern.test(email);
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFromEmail(email);
    setIsEmailValid(validateEmail(email));
  };

  const handleEmailBlur = () => {
    setIsEmailValid(validateEmail(fromEmail));
  };

  const clearForm = () => {
    setFullName('');
    setFromEmail('');
    setIsEmailValid(true);
    setMessage('');
    setResponseMessage('');
  };

  const sendEmail = async () => {
    setIsLoading(true);

    const emailData = {
      to: config.toEmail,
      from: fromEmail,
      name: fullName,
      subject: document.title + ' User feedback',
      text: message
    };

    try {
      const response = await fetch(config.URL + config.sendURI, {
        method: 'POST',
        headers: {
          'Authorization': config.basicAuth,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setIsLoading(false);
        setResponseMessage('Email sent successfully!');
        setTimeout(() => clearForm(), config.interval);
      } else {
        const responseData = await response.json();
        setIsLoading(false);
        setResponseMessage('Error sending email: ' + responseData.message);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setResponseMessage('Error sending email, please try again!');
    }
  };

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <video autoPlay loop muted playsInline className="absolute top-0 h-full w-full object-cover bg-cover bg-center"
          src="/vid/722779149.mp4"
        />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                This a fake company without meaning.
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                Vivamus imperdiet ligula ligula, non fringilla urna efficitur pulvinar.
                Suspendisse in felis in tortor tincidunt ullamcorper at at urna.
                Duis dignissim sit amet augue id porttitor.
                Aenean diam nulla, rhoncus vel erat nec, sollicitudin porttitor purus.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-gray-50 px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                <UsersIcon className="h-6 w-6 text-blue-gray-900" />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Working with us is a pleasure
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                Sed ut nisi ante. Vivamus ex eros, sodales at dolor et, condimentum congue turpis.
                Suspendisse nibh risus, volutpat sit amet sodales vitae, pretium at augue. Suspendisse potenti.
                Integer vehicula tellus vitae ante suscipit viverra. Aliquam erat volutpat. Mauris quis placerat lectus.
                <br /><br />
                Aliquam urna urna, iaculis eu nulla at, dictum cursus metus. Aenean eleifend laoreet enim vel scelerisque.
                Quisque eu risus at lacus feugiat viverra. Nulla non nisi egestas, ornare augue sed, maximus odio.
                Sed sagittis scelerisque est, et iaculis dolor porttitor sed.
              </Typography>
              <Button variant="outlined">read more</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg shadow-gray-500/10">
                <CardHeader className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/teamwork.jpg"
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 font-bold"
                  >
                    Top Notch Services
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle heading="Meet our employees">
            They are surely the coolest developers to ever exist.
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ id, img, name, position, location, socials }) => (
              <TeamCard
                id={id}
                key={name}
                img={img}
                name={name}
                position={position}
                location={location}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-lg fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative bg-blue-gray-50/50 py-24 px-4">
        <div className="container mx-auto">
          <PageTitle heading="Build something">
            Why should we build?
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-white shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>
          <PageTitle heading="Any feedback?">
            Complete this form and we will get back to you in ~{hours} hours.
          </PageTitle>
          <form className="mx-auto mt-12 max-w-2xl text-center">
            <div className={`mb-8 gap-8 ${!isMobile ? 'flex' : ''}`}>
              <Input variant="standard" size="lg" label="Your name"
                value={fullName} onChange={(e) => setFullName(e.target.value)} />
              {isMobile && (<div className="py-4"></div>)}
              <Input
                variant="standard"
                size="lg"
                label="Your email"
                value={fromEmail}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                style={{
                  borderColor: isEmailValid ? '' : 'red',
                  borderBottomWidth: isEmailValid ? '1px' : '6px'
                }}
              />
            </div>
            <Textarea variant="standard" size="lg" label="Your message" rows={8}
              value={message} onChange={(e) => setMessage(e.target.value)} />
            {!responseMessage && (
              <Button variant="gradient" size="lg" id="contactForm" className="mt-8" onClick={sendEmail}
                disabled={isLoading || !fullName || (!fromEmail || (fromEmail && !isEmailValid)) || !message}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
            )}
            {responseMessage && (
              <div className="wrapper">
                <Button variant="gradient" size="lg" className="mt-8" onClick={clearForm}>
                  Clear form
                </Button>
                <div className="p-2"></div>
                <div className={`p-3 items-center text-white leading-none lg:rounded-full flex lg:inline-flex
                  ${responseMessage.includes("Error") ? 'bg-red-600' : 'bg-lime-600'}`} role="alert">
                  <span className="font-semibold mr-2 text-left flex-auto">{responseMessage}</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default Home;

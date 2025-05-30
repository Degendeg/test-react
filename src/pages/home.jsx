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
import DOMPurify from 'dompurify';
import getFromDato from '../data/datocms-data';
import config from "../config/config";

export function Home() {
  const [fullName, setFullName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [message, setMessage] = useState('');
  const [data, setData] = useState('');
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

  useEffect(() => {
    getFromDato(
      `
      query {
        home {
          sect1
          sect2
          sect2Subsect1
          sect3Header
          sect3Text
          sect4Header
          sect4Text
          sect5Header
          sect5Text
        }
        misc {
          readMore
          sending
          sendMessage
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
        <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
          <video autoPlay loop muted playsInline className="absolute top-0 h-full w-full object-cover bg-cover bg-center"
            src="/vid/722779149.mp4"
          />
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
          <div className="max-w-8xl container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home.sect1) }} />
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
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home.sect2) }} />
                <Button variant="outlined">
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.misc.readMore) }} />
                </Button>
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
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.home.sect2Subsect1) }} />
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="px-4 pt-20 pb-48">
          <div className="container mx-auto">
            <PageTitle heading={data.home.sect3Header}>
              {DOMPurify.sanitize(data.home.sect3Text, { ALLOWED_TAGS: [] })}
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
            <PageTitle heading={data.home.sect4Header}>
              {DOMPurify.sanitize(data.home.sect4Text, { ALLOWED_TAGS: [] })}
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
            <PageTitle heading={data.home.sect5Header}>
              {DOMPurify.sanitize(data.home.sect5Text, { ALLOWED_TAGS: [] })
                .split('{hours}')
                .map((part, index) =>
                  index === 0 ? (
                    part
                  ) : (
                    <span key={index}>
                      ~{hours}
                      {part}
                    </span>
                  )
                )
              }
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
              {(!responseMessage && data) && (
                <Button variant="gradient" size="lg" id="contactForm" className="mt-8" onClick={sendEmail}
                  disabled={isLoading || !fullName || (!fromEmail || (fromEmail && !isEmailValid)) || !message}>
                  {isLoading ? data.misc.sending : data.misc.sendMessage}
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
}

export default Home;

import React, { useState, useLayoutEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";

export function Profile() {
  const [connection, setConnection] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const initialText = "At vero eos et accusamus et iusto odio" +
  "dignissimos ducimus qui blanditiis praesentium voluptatum" +
  "deleniti atque corrupti quos dolores et quas molestias" +
  "excepturi sint occaecati cupiditate non provident, similique" +
  "sunt in culpa qui officia deserunt mollitia animi, id est" +
  "laborum et dolorum fuga. Et harum quidem rerum facilis est et" +
  "expedita distinctio. <br /><br /> Nam libero tempore, cum soluta" +
  "nobis est eligendi optio cumque nihil impedit quo minus id quod maxime" +
  "placeat facere possimus, omnis voluptas assumenda est, omnis dolor" +
  "repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum" +
  "necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae" +
  "non recusandae. <br /><br /> Itaque earum rerum hic tenetur a sapiente delectus," +
  "ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis" +
  "doloribus asperiores repellat. Et voluptates repudiandae sint et molestiae non recusandae!";

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const showConnection = () => {
    if (confirm("Do you want to connect with " +
      document.getElementById('typo-full-name').innerHTML + "?")) {
      setConnection('Connected');
    } else {
      setConnection('Connect');
    }
  };

  return (
    <>
      <section className="relative block h-[50vh]">
        <div style={{backgroundImage: `url(${ "/img/background-" + id + ".jpg"})` }}
          className={`bg-profile-background absolute top-0 h-full w-full bg-cover bg-center`} />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                    <div className="-mt-20 w-40">
                      <Avatar
                        src={`/img/team-${id}.jpg`}
                        alt="Profile picture"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  <Button disabled={connection === 'Connected'} onClick={showConnection} className={`${connection === 'Connected' ? 'bg-green-400' : 'bg-blue-400'}`}>
                    {connection ? connection : "Connect"}
                  </Button>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        22
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Friends
                      </Typography>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        10
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Photos
                      </Typography>
                    </div>
                    <div className="p-3 text-center lg:mr-4">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        89
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Comments
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-8 text-center">
                <Typography id="typo-full-name" variant="h2" color="blue-gray" className="mb-2">
                  {location.state.name}
                </Typography>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                  {location.state.location}
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    {location.state.position}
                  </Typography>
                </div>
              </div>

              <div className="mb-10 border-t border-blue-gray-50 py-6 text-center">
                <div className="mt-2 flex flex-wrap justify-center">
                  <div className="flex w-full flex-col items-center px-4 lg:w-9/12">
                    <Button className="mb-4" variant="text" onClick={toggleText}>
                      {isExpanded ? 'Show less' : 'Show more'}
                    </Button>
                    <Typography className="mb-8 font-normal text-blue-gray-500">
                      <span dangerouslySetInnerHTML={{ __html: isExpanded ? initialText : `${initialText.slice(0, 100)}...` }} />
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default Profile;

import React from "react";
import PropTypes from "prop-types";
import { Card, Avatar, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function TeamCard({ id, img, name, position, location, socials }) {
  return (
    <Card color="transparent" shadow={false} className="text-center">
      <Link to={`/profile/${id}`} state={{ img, name, position, location }}>
        <Avatar
          src={img}
          alt={name}
          size="xxl"
          className="h-full w-full shadow-lg shadow-gray-500/25"
        />
      </Link>
      <Typography variant="h5" color="blue-gray" className="mt-6 mb-1">
        {name}
      </Typography>
      {position && (
        <Typography className="font-normal text-blue-gray-500">
          {position}
        </Typography>
      )}
      {socials && <div className="mx-auto mt-5">{socials}</div>}
    </Card>
  );
}

TeamCard.defaultProps = {
  position: "",
  socials: null,
};

TeamCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string,
  socials: PropTypes.node,
};

TeamCard.displayName = "/src/widgets/layout/team-card.jsx";

export default TeamCard;

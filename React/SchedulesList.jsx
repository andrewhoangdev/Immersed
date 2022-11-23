import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Schedule from "./Schedule";

const SchedulesList = (props) => {
  const [scheduleInfo, setScheduleInfo] = useState({
    scheduleArray: [],
    scheduleComponent: [],
  });

  useEffect(() => {
    setScheduleInfo((prevState) => {
      let si = { ...prevState };
      si.scheduleComponent = props.scheduleData.map(mapScheduleData);
      return si;
    });
  }, [props]);

  const mapScheduleData = (schedule, index) => {
    return <Schedule schedule={schedule} key={index} />;
  };

  return (
    <Card className="h-100">
      <Card.Header className="d-flex align-items-center justify-content-between card-header-height">
        <h4 className="mb-0">{props.title}</h4>
        <Link to="#" className="btn btn-outline-white btn-sm">
          View all
        </Link>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">{scheduleInfo.scheduleComponent}</ListGroup>
      </Card.Body>
    </Card>
  );
};

SchedulesList.propTypes = {
  scheduleData: PropTypes.func,
  title: PropTypes.string,
};

export default SchedulesList;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { Col, Row, Image, Card, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import organizationsService from "services/organizationService";
import orgAdminService from "services/orgAdminService";
import logger from "sabio-debug";
import StatRightIcon from "./StatRightIcon";
import ApexCharts from "./ApexCharts";
import {
  TrafficChartSeries,
  TrafficChartOptions,
  EarningsChartSeries,
  EarningsChartOptions,
} from "./ChartData";
import SchedulesList from "./SchedulesList";
import RecentBlogs from "./RecentBlogs";
import RecentNewsletters from "./RecentNewsletters";
import toastr from "toastr";

const _logger = logger.extend("Analytics");

const organization = {
  orgId: "",
  orgLogo: "",
  name: "",
  orgType: "",
  employeeCount: "",
  traineeCount: "",
};

const blogData = [];

const trainingSchedule = [];

const Analytics = (props) => {
  const user = props.currentUser;

  let [currentOrg, setCurrentOrg] = useState({
    ...organization,
  });

  let [blog, setBlog] = useState(() => {
    return blogData;
  });

  let [schedule, setSchedule] = useState(() => {
    return trainingSchedule;
  });

  useEffect(() => {
    getOrganization();
  }, []);

  useEffect(() => {
    if (currentOrg?.orgId) {
      getOrganizationData();
    }
  }, [currentOrg?.orgId]);

  const getOrganization = () => {
    const id = user.id;
    organizationsService
      .organizationByUserId(id)
      .then(onGetOrganizationSuccess)
      .catch(onGetOrganizationFail);
  };

  const getOrganizationData = () => {
    const orgId = currentOrg.orgId;
    const numberSelection = 2;
    orgAdminService
      .getOrgAdminData(orgId, numberSelection)
      .then(onGetOrganizationDataSuccess)
      .catch(onGetOrganizationDataFail);
  };

  const onGetOrganizationSuccess = (response) => {
    _logger("getOrganization success", response);
    setCurrentOrg((prevState) => {
      let orgInfo = { ...prevState };
      orgInfo.orgId = response.item.pagedItems[0].id;
      orgInfo.orgLogo = response.item.pagedItems[0].logoUrl;
      orgInfo.name = response.item.pagedItems[0].name;
      orgInfo.orgType = response.item.pagedItems[0].organizationType.name;
      return orgInfo;
    });
  };
  const onGetOrganizationDataSuccess = (response) => {
    _logger("getOrganizationData success", response);
    setCurrentOrg((prevState) => {
      let orgData = { ...prevState };
      orgData.employeeCount = response.item.employeeCount;
      orgData.traineeCount = response.item.traineeCount;
      return orgData;
    });
    setBlog((prevState) => {
      let blogInfo = { ...prevState };
      blogInfo = response.item.blogs;
      return blogInfo;
    });
    setSchedule((prevState) => {
      let scheduleInfo = { ...prevState };
      scheduleInfo = response.item.trainings;
      return scheduleInfo;
    });
  };

  const onGetOrganizationFail = (error) => {
    _logger("getOrganization fail", error);
    toastr.error("Could not find organization");
  };

  const onGetOrganizationDataFail = (error) => {
    _logger("getOrganizationData fail", error);
    toastr.error("Could not find organization data");
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));

  const ChartActionMenu = () => {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            <i className="fe fe-more-vertical text-muted"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Header>SETTINGS</Dropdown.Header>
            <Dropdown.Item eventKey="1">
              <i className="fe fe-external-link dropdown-item-icon "></i> Export
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <i className="fe fe-mail dropdown-item-icon "></i> Email Report
            </Dropdown.Item>
            <Dropdown.Item eventKey="3">
              <i className="fe fe-download dropdown-item-icon "></i> Download
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  return (
    <Fragment>
      <Row className="align-items-center, mb-3 mt-1">
        <Col xl={12} lg={12} md={12} sm={12}>
          <div className="d-flex align-items-end justify-content-between bg-white px-4 pt-2 pb-4 rounded-none rounded-bottom-md shadow-sm">
            <div className="d-flex align-items-center">
              <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                <Image
                  src={currentOrg.orgLogo}
                  className="avatar-xl rounded-circle border border-4 border-white position-relative"
                  alt="avatar"
                />
              </div>
              <div className="lh-1">
                <h2 className="mb-0">{currentOrg.name}</h2>
                <p className="mb-0 d-block">{currentOrg.orgType}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} xl={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex justify-content-between align-items-center">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-0 h2 fw-bold">Dashboard</h1>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Row className="ms-0 px-0">
          <Col xl={3} lg={6} md={12} sm={12}>
            <StatRightIcon
              title="STAFF COUNT"
              value={currentOrg.employeeCount}
              iconName="user-check"
              iconColorVariant="primary"
              classValue="mb-4"
              summary="Employees"
              summaryValue="+2"
              summaryIcon="up"
              showSummaryIcon="true"
            />
          </Col>
          <Col xl={3} lg={6} md={12} sm={12}>
            <StatRightIcon
              title="SCHEDULES"
              value={schedule.length}
              summary="Pending Schedules"
              summaryValue="+3"
              summaryIcon="up"
              iconName="book-open"
              iconColorVariant="primary"
              classValue="mb-4"
              showSummaryIcon="true"
            />
          </Col>
          <Col xl={3} lg={6} md={12} sm={12}>
            <StatRightIcon
              title="TRAINEES"
              value={currentOrg.traineeCount}
              summary="Trainees"
              summaryValue="+50"
              summaryIcon="up"
              showSummaryIcon="true"
              iconName="users"
              iconColorVariant="primary"
              classValue="mb-4"
            />
          </Col>
          <Col xl={3} lg={6} md={12} sm={12}>
            <StatRightIcon
              title="PLACEHOLDER"
              value={10}
              summary="Value"
              summaryValue="-10"
              summaryIcon="down"
              showSummaryIcon="true"
              iconName="folder"
              iconColorVariant="primary"
              classValue="mb-4"
            />
          </Col>
        </Row>
        <Row className="ms-0 px-0">
          <Col xl={8} lg={12} md={12} className="mb-4">
            <Card>
              <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0">Chart</h4>
                </div>
                <div>
                  <ChartActionMenu />
                </div>
              </Card.Header>
              <Card.Body>
                <ApexCharts
                  options={EarningsChartOptions}
                  series={EarningsChartSeries}
                  type="line"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xl={4} lg={12} md={12}>
            <Card>
              <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0">Chart</h4>
                </div>
                <div>
                  <ChartActionMenu />
                </div>
              </Card.Header>
              <Card.Body className="py-lg-7">
                <div id="chart">
                  <ApexCharts
                    options={TrafficChartOptions}
                    series={TrafficChartSeries}
                    type="donut"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Col xl={4} lg={6} md={12} className="mb-4">
          <SchedulesList title="Schedules" scheduleData={schedule} />
        </Col>
        <Col xl={4} lg={6} md={12} className="mb-4">
          <RecentBlogs title="Recent Blogs" blogData={blog} />
        </Col>
        <Col xl={4} lg={6} md={12} className="mb-4">
          <RecentNewsletters title="Recent Newsletters" />
        </Col>
      </Row>
    </Fragment>
  );
};

Analytics.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
  children: PropTypes.func,
  onClick: PropTypes.func,
};

export default Analytics;

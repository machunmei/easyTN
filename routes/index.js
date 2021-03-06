var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  req.models.person.find({ name: 'SB' }, function (err, result) {

  });
  res.render('index', { title: 'Express' });
});

router.get('/company/:id', function (req, res, next) {
  req.models.company.find({ id: req.params.id }, function (err, result) {
    if (err) {
      res.sendStatus(404);
      return;
    }

    res.send(result);
  });
});

router.post('/company', function (req, res, next) {
  if (!req.body.name) {
    res.sendStatus(404);
    return;
  }

  var company = {
    name: req.body.name,
    location: req.body.location,
    years_funded: req.body.years_funded,
    employer_count: req.body.employer_count,
    type: req.body.type,
    industry: req.body.industry
  }

  req.models.company.create(company, function (err, result) {
    if (err) {
      res.sendStatus(500);
    }

    res.send(result);
  });
});

router.get('/company-content/:company_id', function (req, res, next) {
  req.models.companyContent.find({ company_id: req.params.company_id }, function (err, result) {
    if (err) {
      res.sendStatus(404);
      return;
    }

    res.send(result);
  });
});

router.post('/company-content', function (req, res, next) {
  if (!req.body.company_id) {
    res.sendStatus(404);
    return;
  }

  var companyContent = {
    company_id: req.body.company_id,
    mission: req.body.mission,
    about_us: req.body.about_us,
    contact_us: req.body.contact_us,
    logo: req.body.logo,
    hp_imgs: req.body.hp_imgs,
    about_us_imgs: req.body.about_us_imgs
  };

  req.models.companyContent.create(companyContent, function (err, result) {
    if (err) {
      res.sendStatus(500);
    }

    res.send(result);
  });
});

module.exports = router;

import React from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
import Header from "./components/header";
import Field from "./components/field";
import LinkedNotices from "./components/LinkedNotices";
import Title from "./components/title";
import Loader from "../../components/loader";
import API from "../../services/api";
import ContactUs from "./components/ContactUs";
import NotFound from "../../components/NotFound";
import Helmet from "../../components/Helmet";
import { schema } from "./utils.js";

class Memoire extends React.Component {
  state = {
    error: "",
    loading: false
  };

  componentDidMount() {
    const { match, fetchNotice, notice } = this.props;
    if (notice === null) {
      this.setState({ loading: true });
      fetchNotice(match.params.ref, true);
    }
  }

  componentDidUpdate(prevProps) {
    const { notice } = this.props;
    const { notice: prevNotice } = prevProps;
    if (notice !== null && notice !== prevNotice) {
      this.setState({
        loading: false
      });
    }
  }

  getMeta = () => {
    const { notice } = this.props;
    const title = notice.TICO || notice.TITR;
    const auteur = notice.AUTP ? notice.AUTP : "";

    return {
      title: title ? `${title} - POP` : `${notice.REF} - POP`,
      description: `Découvrez ${
        title ? title : notice.REF
      }, par ${auteur}. Cliquez ici !`
    };
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    const { notice, links } = this.props;
    if (!notice) {
      return <NotFound />;
    }

    const meta = this.getMeta();

    console.log("NN", notice);
    const obj = {
      name: notice.TICO,
      created_at: notice.DATPV,
      artform: notice.DOM,
      image: notice.IMG,
      description: notice.LEG,
      // artMedium: notice.TECH.join(", "),
      // creator: notice.AUTR.split(";"),
      // comment: notice.COMM,
      // contentLocation: notice.LOCA
    };

    return (
      <Container className="notice" fluid>
        <Helmet
          title={meta.title}
          description={meta.description}
          schema={schema(obj)}
        />
        <Row className="top-section">
          <Col>
            <h1 className="heading">{notice.TICO}</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="9">
            <Header
              notice={notice}
              images={[notice.IMG]}
              externalImages={true}
            />
            <Row>
              <Col sm="12">
                <div className="notice-details">
                  <Title
                    content="1. Sujet de la photographie"
                    notice={notice}
                    fields={[
                      "LOCA",
                      "INSEE",
                      "ADRESSE",
                      "MCGEO",
                      "EDIF",
                      "OBJT",
                      "TICO",
                      "LEG",
                      "TITRE",
                      "THEATRE",
                      "ROLE",
                      "AUTOEU",
                      "SCLE",
                      "DATOEU",
                      "LIEUORIG",
                      "SERIE",
                      "MCL",
                      "SUJET",
                      "MCPER",
                      "AUTOR",
                      "TIREDE",
                      "LIEUCOR",
                      "COTECOR",
                      "AUTG"
                    ]}
                  />
                  <Title
                    content="Localisation"
                    h5={true}
                    notice={notice}
                    fields={["LOCA", "INSEE", "ADRESSE", "MCGEO"]}
                  />
                  <Field title="Localisation" content={notice.LOCA} />
                  <Field title="Code INSEE" content={notice.INSEE} />
                  <Field title="Adresse:" content={notice.ADRESSE} />
                  <Field title="Nom géographique" content={notice.MCGEO} />
                  <Title
                    content="Identification"
                    h5={true}
                    notice={notice}
                    fields={[
                      "EDIF",
                      "OBJT",
                      "TICO",
                      "LEG",
                      "TITRE",
                      "THEATRE",
                      "ROLE",
                      "AUTOEU",
                      "SCLE",
                      "DATOEU",
                      "LIEUORIG",
                      "SERIE",
                      "MCL",
                      "SUJET",
                      "MCPER"
                    ]}
                  />
                  <Field title="Nom édifice" content={notice.EDIF} />
                  <Field title="Nom objet" content={notice.OBJT} />
                  <Field title="Titre du dossier" content={notice.TICO} />

                  <Field title="Légende" content={notice.LEG} />
                  <Field title="Titre" content={notice.TITRE} />
                  <Field title="Nom de théâtre" content={notice.THEATRE} />
                  <Field title="Rôle joué" content={notice.ROLE} />
                  <Field title="Auteur de l’œuvre" content={notice.AUTOEU} />
                  <Field title="Siècle de l’œuvre" content={notice.SCLE} />
                  <Field title="Date de l’œuvre" content={notice.DATOEU} />
                  <Field
                    title="Lieu d’origine de l’élément réemployé"
                    content={notice.LIEUORIG}
                  />
                  <Field title="Titre de la série" content={notice.SERIE} />
                  <Field
                    title="Mots-clés"
                    content={notice.MCL + " " + notice.SUJET}
                  />
                  <Field
                    title="Identité de la personne photographiée"
                    content={notice.MCPER}
                  />
                  <Title
                    content="Références des documents reproduits"
                    h5={true}
                    notice={notice}
                    fields={["AUTOR", "TIREDE", "LIEUCOR", "COTECOR", "AUTG"]}
                  />
                  <Field
                    title="Auteur du document original"
                    content={notice.AUTOR}
                  />
                  <Field
                    title="Référence bibliographique ou documentaire"
                    content={notice.TIREDE}
                  />
                  <Field
                    title="Lieu de conservation"
                    content={notice.LIEUCOR}
                  />
                  <Field
                    title="Cote de conservation"
                    content={notice.COTECOR}
                  />
                  <Field title="Auteur de la gravure" content={notice.AUTG} />
                </div>
                <div className="notice-details">
                  <Title
                    content="2. Auteur"
                    notice={notice}
                    fields={["AUTP", "AUTTI"]}
                  />
                  <Field
                    title="Photographe ou dessinateur"
                    content={notice.AUTP}
                  />
                  <Field title="Auteur du tirage" content={notice.AUTTI} />
                </div>
                <div className="notice-details">
                  <Title
                    content="3. Description de la photographie"
                    notice={notice}
                    fields={[
                      "TYPDOC",
                      "NUMI",
                      "NUMP",
                      "ANUMP",
                      "NUMAUTP",
                      "NUMTI",
                      "ANUMTI",
                      "REPRO",
                      "NUMG",
                      "NUMOR",
                      "ANUMOR",
                      "RENV",
                      "LIEUCTI",
                      "COTECTI",
                      "PRECOR",
                      "ACQU",
                      "DIFF",
                      "ECH",
                      "TECH",
                      "FORMAT",
                      "TECHTI",
                      "FORMATTI",
                      "TECHOR",
                      "FORMATOR",
                      "MENTIONS",
                      "MENTTI",
                      "SENS",
                      "DATPV",
                      "JDATPV",
                      "DATOR",
                      "PUBLI",
                      "OBS",
                      "OBSTI",
                      "OBSOR"
                    ]}
                  />
                  <Title
                    content="Éléments d’identification"
                    h5={true}
                    notice={notice}
                    fields={[
                      "TYPDOC",
                      "NUMI",
                      "NUMP",
                      "ANUMP",
                      "NUMAUTP",
                      "NUMTI",
                      "ANUMTI",
                      "REPRO",
                      "NUMG",
                      "NUMOR",
                      "ANUMOR",
                      "RENV",
                      "LIEUCTI",
                      "COTECTI",
                      "PRECOR",
                      "ACQU",
                      "DIFF",
                      "ECH"
                    ]}
                  />
                  <Field
                    title="Catégorie de phototype"
                    content={notice.TYPDOC}
                  />

                  <Field title="Numéro du phototype" content={notice.NUMI} />
                  <Field title="Numéro du négatif" content={notice.NUMP} />
                  <Field
                    title="Ancien numéro du négatif"
                    content={notice.ANUMP}
                  />
                  <Field
                    title="Numéro donné par le photographe"
                    content={notice.NUMAUTP}
                  />
                  <Field title="Numéro du tirage" content={notice.NUMTI} />
                  <Field
                    title="Ancien numéro du tirage"
                    content={notice.ANUMTI}
                  />
                  <Field
                    title="Numéro de reproduction"
                    content={notice.REPRO}
                  />
                  <Field title="Numéro de la gravure" content={notice.NUMG} />
                  <Field title="Numéro de l’original" content={notice.NUMOR} />
                  <Field
                    title="Ancien numéro de l’original"
                    content={notice.ANUMOR}
                  />
                  <Field
                    title="Phototype(s) en relation"
                    content={notice.RENV}
                  />
                  <Field
                    title="Lieu de conservation du tirage"
                    content={notice.LIEUCTI}
                  />
                  <Field
                    title="Cote de conservation du tirage"
                    content={notice.COTECTI}
                  />
                  <Field
                    title="Précisions sur la conservation de l’original"
                    content={notice.PRECOR}
                  />
                  <Field title="Modalité d’entrée" content={notice.ACQU} />
                  <Field title="Droits de diffusion" content={notice.DIFF} />
                  <Field title="Échelle du graphique" content={notice.ECH} />
                  <Title
                    content="Description technique du phototype"
                    h5={true}
                    notice={notice}
                    fields={[
                      "TECH",
                      "FORMAT",
                      "TECHTI",
                      "FORMATTI",
                      "TECHOR",
                      "FORMATOR",
                      "MENTIONS",
                      "MENTTI",
                      "SENS"
                    ]}
                  />
                  <Field
                    title="Description technique du négatif"
                    content={notice.TECH}
                  />
                  <Field title="Format du négatif" content={notice.FORMAT} />
                  <Field
                    title="Description technique du tirage"
                    content={notice.TECHTI}
                  />
                  <Field title="Format du tirage" content={notice.FORMATTI} />
                  <Field
                    title="Description technique de l’original"
                    content={notice.TECHOR}
                  />
                  <Field
                    title="Format de l'original"
                    content={notice.FORMATOR}
                  />
                  <Field
                    title="Annotations présentes sur le négatif"
                    content={notice.MENTIONS}
                  />
                  <Field title="Mentions tirage" content={notice.MENTTI} />
                  <Field
                    title="Orientation du phototype"
                    content={notice.SENS}
                  />
                  <Title
                    content="Datation et événements liés à l’image"
                    h5={true}
                    notice={notice}
                    fields={[
                      "DATPV",
                      "JDATPV",
                      "DATOR",
                      "PUBLI",
                      "OBS",
                      "OBSTI",
                      "OBSOR"
                    ]}
                  />
                  <Field title="Date prise vue" content={notice.DATPV} />
                  <Field
                    title="Précision sur la date de prise de vue"
                    content={notice.JDATPV}
                  />
                  <Field title="Date de l'original" content={notice.DATOR} />
                  <Field
                    title="Référence de publication de l’image"
                    content={notice.PUBLI}
                  />
                  <Field title="Observations" content={notice.OBS} />
                  <Field
                    title="Observations sur le tirage"
                    content={notice.OBSTI}
                  />
                  <Field
                    title="Observations sur l’original"
                    content={notice.OBSOR}
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm="3">
            <LinkedNotices links={links} />
            <div className="sidebar-section info">
              <h4>A propos de cette notice</h4>
              <hr />
              <div>
                <Field title="Référence" content={notice.REF} />
                <Field title="Date de création" content={notice.DMIS} />
                <Field title="Date de modification" content={notice.DMAJ} />
                <Field title="Crédits photographiques" content={notice.AUTP} />
                <Field
                  title="Auteur de l'oeuvre ou de l'original"
                  content={notice.AUTOR}
                />
                <Field title="" content={notice.COPY} />
              </div>
              <ContactUs contact={notice.CONTACT} reference={notice.REF} />
            </div>
            <SeeMore notice={notice} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const SeeMore = ({ notice }) => {
  if (!notice.LAUTP) {
    return <div />;
  }

  return (
    <div className="sidebar-section info">
      <h4>Voir aussi</h4>
      <hr />
      <div>
        <p className="field">
          Lien vers la base Autor:
          <span>
            <a href="http://www.mediatheque-patrimoine.culture.gouv.fr/pages/bases/autor_cible.html">
              {notice.LAUTP}
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  notice: state.app.notice,
  links: state.app.links
});

const mapDispatchToProps = dispatch => ({
  fetchNotice: (ref, withLinks) => {
    dispatch({
      type: "notice/WILL_FETCH",
      ref,
      withLinks,
      base: "memoire"
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Memoire);

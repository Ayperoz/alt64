import React, { useContext, useState, useEffect, useRef } from "react";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import { i18n } from "../../translate/i18n";
import { head } from "lodash";
import api from "../../services/api";
import toastError from "../../errors/toastError";
import { AuthContext } from "../../context/Auth/AuthContext";
import MessageVariablesPicker from "../MessageVariablesPicker";
import ButtonWithSpinner from "../ButtonWithSpinner";
import { DataGrid } from '@material-ui/data-grid';

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@material-ui/core";
import ConfirmationModal from "../ConfirmationModal";

const path = require('path');

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  multFieldLine: {
    display: "flex",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },

  btnWrapper: {
    position: "relative",
  },

  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  colorAdorment: {
    width: 20,
    height: 20,
  },
}));

const QuickeMessageSchema = Yup.object().shape({
  shortcode: Yup.string().required("Obrigatório"),
  //   message: Yup.string().required("Obrigatório"),
});

const QuickMessageDialog = ({ open, onClose, quickemessageId, reload }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const messageInputRef = useRef();

  const initialState = {
    shortcode: "",
    message: "",
    geral: true,
    visao: true,
    isOficial: false,
    status: "",
    language: "",
    category: "",
    metaID: "",
  };

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [quickemessage, setQuickemessage] = useState(initialState);
  const [attachment, setAttachment] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const attachmentFile = useRef(null);

  useEffect(() => {
    try {
      (async () => {
        if (!quickemessageId) return;

        const { data } = await api.get(`/quick-messages/${quickemessageId}`);

        setQuickemessage((prevState) => {
          return { ...prevState, ...data };
        });
      })();
    } catch (err) {
      toastError(err);
    }
  }, [quickemessageId, open]);

  const handleClose = () => {
    setQuickemessage(initialState);
    setAttachment(null);
    onClose();
  };

  const handleAttachmentFile = (e) => {
    const file = head(e.target.files);
    if (file) {
      setAttachment(file);
    }
  };

  const handleSaveQuickeMessage = async (values) => {

    const quickemessageData = {
      ...values,
      isMedia: true,
      mediaPath: attachment ? String(attachment.name).replace(/ /g, "_") : values.mediaPath ? path.basename(values.mediaPath).replace(/ /g, "_") : null,
      isOficial: quickemessageId ? values.isOficial : false
    };

    try {
      if (quickemessageId) {
        await api.put(`/quick-messages/${quickemessageId}`, quickemessageData);
        if (attachment != null) {
          const formData = new FormData();
          formData.append("typeArch", "quickMessage");
          formData.append("file", attachment);
          await api.post(
            `/quick-messages/${quickemessageId}/media-upload`,
            formData
          );
        }
      } else {
        const { data } = await api.post("/quick-messages", quickemessageData);
        if (attachment != null) {
          const formData = new FormData();
          formData.append("typeArch", "quickMessage");
          formData.append("file", attachment);
          await api.post(`/quick-messages/${data.id}/media-upload`, formData);
        }
      }
      toast.success(i18n.t("quickMessages.toasts.success"));
      if (typeof reload == "function") {
        console.log(reload);
        console.log("0");
        reload();
      }
    } catch (err) {
      toastError(err);
    }
    handleClose();
  };
  const rowsWithIds = quickemessage?.components?.map((component, index) => ({
    id: index,  // ou use um campo único de 'component', se houver
    ...component
  }));

  const deleteMedia = async () => {
    if (attachment) {
      setAttachment(null);
      attachmentFile.current.value = null;
    }

    if (quickemessage.mediaPath) {
      await api.delete(`/quick-messages/${quickemessage.id}/media-upload`);
      setQuickemessage((prev) => ({
        ...prev,
        mediaPath: null,
      }));
      toast.success(i18n.t("quickMessages.toasts.deleted"));
      if (typeof reload == "function") {
        console.log(reload);
        console.log("1");
        reload();
      }
    }
  };

  const handleClickMsgVar = async (msgVar, setValueFunc) => {
    const el = messageInputRef.current;
    const firstHalfText = el.value.substring(0, el.selectionStart);
    const secondHalfText = el.value.substring(el.selectionEnd);
    const newCursorPos = el.selectionStart + msgVar.length;

    setValueFunc("message", `${firstHalfText}${msgVar}${secondHalfText}`);

    await new Promise(r => setTimeout(r, 100));
    messageInputRef.current.setSelectionRange(newCursorPos, newCursorPos);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className={classes.root}>
      <ConfirmationModal
        title={i18n.t("quickMessages.confirmationModal.deleteTitle")}
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={deleteMedia}
      >
        {i18n.t("quickMessages.confirmationModal.deleteMessage")}
      </ConfirmationModal>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xl"
        fullWidth
        scroll="paper"
      >
        <DialogTitle id="form-dialog-title">
          {quickemessageId
            ? `${i18n.t("quickMessages.dialog.edit")}`
            : `${i18n.t("quickMessages.dialog.add")}`}
        </DialogTitle>
        <div style={{ display: "none" }}>
          <input
            type="file"
            // accept="Image/*, Video/*"
            ref={attachmentFile}
            onChange={(e) => handleAttachmentFile(e)}
          />
        </div>
        <Formik
          initialValues={quickemessage}
          enableReinitialize={true}
          validationSchema={QuickeMessageSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              handleSaveQuickeMessage(values);
              actions.setSubmitting(false);
            }, 400);
          }}
        >
          {({ touched, errors, isSubmitting, setFieldValue, values }) => (
            <Form>
              <DialogContent dividers>
                <Tabs
                  value={tabIndex}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Geral" />
                  {values.isOficial && <Tab label="Oficial" />}
                </Tabs>
                {tabIndex === 0 && (
                  <Grid spacing={2} container>
                    <Grid xs={12} item>
                      <Field
                        as={TextField}
                        autoFocus
                        label={i18n.t("quickMessages.dialog.shortcode")}
                        name="shortcode"
                        disabled={quickemessageId && values.visao && !values.geral && values.userId !== user.id}
                        error={touched.shortcode && Boolean(errors.shortcode)}
                        helperText={touched.shortcode && errors.shortcode}
                        variant="outlined"
                        margin="dense"
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <Field
                        as={TextField}
                        label={i18n.t("quickMessages.dialog.message")}
                        name="message"
                        inputRef={messageInputRef}
                        error={touched.message && Boolean(errors.message)}
                        helperText={touched.message && errors.message}
                        variant="outlined"
                        margin="dense"
                        disabled={quickemessageId && values.visao && !values.geral && values.userId !== user.id}
                        multiline={true}
                        rows={7}
                        fullWidth
                      // disabled={quickemessage.mediaPath || attachment ? true : false}
                      />
                    </Grid>

                    <Grid item xs={12} md={12} xl={12}>
                      <MessageVariablesPicker
                        disabled={isSubmitting || (quickemessageId && values.visao && !values.geral && values.userId !== user.id)}
                        onClick={value => handleClickMsgVar(value, setFieldValue)}
                      />
                    </Grid>
                    {/* {(profile === "admin" || profile === "supervisor") && ( */}
                    <Grid xs={12} item>
                      <FormControl variant="outlined" margin="dense" fullWidth>
                        <InputLabel id="geral-selection-label">
                          {i18n.t("quickMessages.dialog.visao")}
                        </InputLabel>
                        <Field
                          as={Select}
                          label={i18n.t("quickMessages.dialog.visao")}
                          placeholder={i18n.t("quickMessages.dialog.visao")}
                          labelId="visao-selection-label"
                          id="visao"
                          disabled={quickemessageId && values.visao && !values.geral && values.userId !== user.id}
                          name="visao"
                          onChange={(e) => {
                            setFieldValue("visao", e.target.value === "true");
                          }}
                          error={touched.visao && Boolean(errors.visao)}
                          value={values.visao ? "true" : "false"} // Converte o valor booleano para string
                        >
                          <MenuItem value={"true"}>{i18n.t("announcements.active")}</MenuItem>
                          <MenuItem value={"false"}>{i18n.t("announcements.inactive")}</MenuItem>
                        </Field>
                      </FormControl>
                      {/* Renderização condicional do novo item */}
                      {values.visao === true && (
                        <FormControl variant="outlined" margin="dense" fullWidth>
                          <InputLabel id="geral-selection-label">
                            {i18n.t("quickMessages.dialog.geral")}
                          </InputLabel>
                          <Field
                            as={Select}
                            label={i18n.t("quickMessages.dialog.geral")}
                            placeholder={i18n.t("quickMessages.dialog.geral")}
                            labelId="novo-item-selection-label"
                            id="geral"
                            name="geral"
                            disabled={quickemessageId && values.visao && !values.geral && values.userId !== user.id}
                            value={values.geral ? "true" : "false"} // Converte o valor booleano para string
                            error={touched.geral && Boolean(errors.geral)}
                          >
                            <MenuItem value={"true"}>{i18n.t("announcements.active")}</MenuItem>
                            <MenuItem value={"false"}>{i18n.t("announcements.inactive")}</MenuItem>
                          </Field>
                        </FormControl>
                      )}
                    </Grid>
                    {/* )} */}
                    {(quickemessage.mediaPath || attachment) && (
                      <Grid xs={12} item>
                        <Button startIcon={<AttachFileIcon />}>
                          {attachment ? attachment.name : quickemessage.mediaName}
                        </Button>
                        <IconButton
                          onClick={() => setConfirmationOpen(true)}
                          color="secondary"
                          disabled={quickemessageId && values.visao && !values.geral && values.userId !== user.id}
                        >
                          <DeleteOutlineIcon color="secondary" />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                )}
                {tabIndex === 1 && (
                  <>
                    <Grid xs={12} item>
                      <DataGrid
                        rows={rowsWithIds}
                        columns={[
                          { field: 'type', headerName: 'Tipo', width: 150 },
                          { field: 'text', headerName: 'Valor', width: 400 }
                        ]}
                        pageSize={5}
                        disableSelectionOnClick
                        autoHeight={true}
                      />
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid xl={6} md={6} sm={12} xs={12} item>
                        <Field
                          as={TextField}
                          autoFocus
                          label={i18n.t("quickMessages.dialog.status")}
                          name="status"
                          disabled={values.isOficial}
                          error={touched.status && Boolean(errors.status)}
                          helperText={touched.status && errors.status}
                          variant="outlined"
                          margin="dense"
                          fullWidth
                        />
                      </Grid>
                      <Grid xl={6} md={6} sm={12} xs={12} item>
                        <Field
                          as={TextField}
                          autoFocus
                          label={i18n.t("quickMessages.dialog.language")}
                          name="language"
                          disabled={values.isOficial}
                          error={touched.language && Boolean(errors.language)}
                          helperText={touched.language && errors.language}
                          variant="outlined"
                          margin="dense"
                          fullWidth
                        />
                      </Grid>
                      <Grid xl={6} md={6} sm={12} xs={12} item>
                        <Field
                          as={TextField}
                          autoFocus
                          label={i18n.t("quickMessages.dialog.category")}
                          name="category"
                          disabled={values.isOficial}
                          error={touched.category && Boolean(errors.category)}
                          helperText={touched.category && errors.category}
                          variant="outlined"
                          margin="dense"
                          fullWidth
                        />
                      </Grid>
                      <Grid xl={6} md={6} sm={12} xs={12} item>
                        <Field
                          as={TextField}
                          autoFocus
                          label={i18n.t("quickMessages.dialog.metaID")}
                          name="metaID"
                          disabled={values.isOficial}
                          error={touched.metaID && Boolean(errors.metaID)}
                          helperText={touched.metaID && errors.metaID}
                          variant="outlined"
                          margin="dense"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
              </DialogContent>
              <DialogActions>
                {!attachment && !quickemessage.mediaPath && (
                  <Button
                    color="primary"
                    onClick={() => attachmentFile.current.click()}
                    disabled={isSubmitting || (quickemessageId && values.visao && !values.geral && values.userId !== user.id)}
                    variant="outlined"
                  >
                    {i18n.t("quickMessages.buttons.attach")}
                  </Button>
                )}
                <Button
                  onClick={handleClose}
                  color="secondary"
                  disabled={isSubmitting}
                  variant="outlined"
                >
                  {i18n.t("quickMessages.buttons.cancel")}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting || (quickemessageId && values.visao && !values.geral && values.userId !== user.id)}
                  variant="contained"
                  className={classes.btnWrapper}
                >
                  {quickemessageId
                    ? `${i18n.t("quickMessages.buttons.edit")}`
                    : `${i18n.t("quickMessages.buttons.add")}`}
                  {isSubmitting && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default QuickMessageDialog;
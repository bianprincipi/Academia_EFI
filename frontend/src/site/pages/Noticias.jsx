import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Stack,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { green, blueGrey } from "@mui/material/colors";

export default function Noticias() {
  const [notas, setNotas] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch("/news.json", { cache: "no-store" });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        setNotas(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr("No se pudieron cargar las noticias");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Box sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
          textAlign: "center",
          color: green[800],
        }}
      >
        📰 Noticias
      </Typography>

      {loading && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          Cargando noticias…
        </Typography>
      )}

      {err && (
        <Typography
          variant="body2"
          color="error"
          sx={{ textAlign: "center", mb: 2 }}
        >
          {err}
        </Typography>
      )}

      {/* LISTA DE NOTICIAS */}
      <Grid container spacing={3}>
        {notas.map((n, i) => (
          <Grid item key={i} xs={12} md={6} lg={4}>
            <Card
              elevation={4}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                },
              }}
            >
              {n.img && (
                <CardMedia
                  component="img"
                  height="180"
                  image={n.img}
                  alt={n.titulo}
                />
              )}

              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: blueGrey[900] }}
                >
                  {n.titulo}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {n.bajada}
                </Typography>

                <Typography
                  variant="caption"
                  color={green[700]}
                  sx={{ display: "block", mt: 1 }}
                >
                  📅 {n.fecha}
                </Typography>

                {n.link && (
                  <Button
                    href={n.link}
                    size="small"
                    variant="contained"
                    sx={{
                      mt: 2,
                      bgcolor: green[700],
                      "&:hover": { bgcolor: green[900] },
                    }}
                  >
                    Leer más
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}

        {!loading && notas.length === 0 && !err && (
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "text.secondary" }}
            >
              No hay noticias por el momento.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

import { Helmet } from 'react-helmet-async';
import { Box, Card, Container, Grid, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCreateMaster, useGetMasterById } from 'services/Master.Services';
import { useSettingsContext } from 'components/settings';
import { useAuthContext } from 'auth/useAuthContext';
import Scrollbar from 'components/scrollbar';

export default function ManagerAccessPage() {
  const navigate = useNavigate();
  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();
  const { data, isSuccess } = useGetMasterById('manager', user.id);
  console.log('data manager', data?.manage_vso);

  return (
    <>
      <Helmet>
        <title>VSO MANAGE | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 5, backgroundColor: 'primary.dark' }}>
              <Scrollbar>
                <Stack direction="column" sx={{ py: 2 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      width: 1,
                      minWidth: 200,
                      height: 1,
                      p: 2,
                      py: 2,
                      minHeight: {
                        md: 662,
                        lg: 662,
                        xl: 662,
                      },
                    }}
                  >
                    <Stack
                      spacing={0.5}
                      sx={{ ml: 2 }}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      gap={2}
                    >
                      {data?.manage_vso && data.manage_vso.length > 0 ? (
                        data.manage_vso.map((vsoId) => (
                          <Typography
                            key={vsoId}
                            variant="subtitle1"
                            sx={{
                              backgroundColor: '#fff',
                              borderRadius: '5px',
                              px: 2,
                              py: 1,
                              cursor: 'pointer',
                              width: '100%',
                              textAlign: 'center',
                              minWidth: 100,
                            }}
                            onClick={() => navigate(`/dashboard/vsostock/${vsoId}`)}
                          >
                            <Box
                              component="span"
                              sx={{
                                color: 'text.primary',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                              }}
                            >
                              Stock: {vsoId}
                            </Box>
                          </Typography>
                        ))
                      ) : (
                        <Typography
                          variant="subtitle1"
                          sx={{
                            backgroundColor: '#fff',
                            borderRadius: '5px',
                            px: 2,
                            py: 1,
                            cursor: 'default',
                            width: '100%',
                            textAlign: 'center',
                            minWidth: 100,
                          }}
                        >
                          No VSO Assigned
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Scrollbar>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
